import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { DrizzleQueryError, eq } from 'drizzle-orm'
import nodemailer from 'nodemailer'
import Nunjucks from 'nunjucks'
import https from 'https'
import Type from 'typebox'
import _Ajv from "ajv";
const Ajv = _Ajv as unknown as typeof _Ajv.default;
const ajv = new Ajv()

import { relations } from "./db/relations.ts"
import { invoiceTable, paymentTable } from './db/schema.ts'

const PRICE_PER_DAY = 2500
const PRICE_FULL = 9800
const PRICE_DISCOUNT = 9000

// Database connection
const db = drizzle(process.env.DATABASE_URL!, {
    relations
});

// nodemailer
const smtp = nodemailer.createTransport({
    host: "smtp.seznam.cz",
    port: 587,        // STARTTLS port can be used from Hetzner
    secure: false,    // This is ok in conjunction with requireTLS
    requireTLS: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});
try {
    await smtp.verify();
    console.log("SMTP server is ready.");
} catch (err) {
    console.error("Verification failed:", err);
}

// Nunjucks
Nunjucks.configure("templates/")

const guardians = await db.query.guardianTable.findMany({
    with: {
        children: true,
        invoices: true
    }
});

for (const g of guardians) {

    if (g.invoices.length > 0) {
        continue
    }

    let price = 0
    let price_calculation = []
    for (const c of g.children) {
        let num_days = [
            c.days_mon, c.days_tue, c.days_wed, c.days_thu, c.days_fri
        ].reduce((acc, b) => acc + (b ? 1 : 0), 0)

        let partial_price = 0
        if (num_days < 4) {
            partial_price = PRICE_PER_DAY * num_days
        } else if (g.children.length == 1) {
            partial_price = PRICE_FULL
        } else {
            partial_price = PRICE_DISCOUNT
        }
        price += partial_price

        price_calculation.push({
            "child_name": `${c.forename} ${c.surname}`,
            "num_days": num_days,
            "price": partial_price / 100
        })
    }

    let inserted_invoice : any = null

    for (let i = 0; i < 1024; ++i) {
        const variable_symbol = 1000 + Math.floor(Math.random() * 1000)

        try {
            // TODO: Invoice number?
            const invoice: typeof invoiceTable.$inferInsert = {
                guardian_id: g.id,
                amount_eur_cents: price,
                variable_symbol: variable_symbol,
                pay_until: new Date("2026-08-15T00:00:00")
            }
            inserted_invoice = await db.insert(invoiceTable).values(invoice).returning({
                variable_symbol: invoiceTable.variable_symbol
            });
        }
        catch {}

        if (g.invoices) {
            break
        }
    }

    if (!inserted_invoice) {
        console.error(`Error generating invoice for guardian ID ${g.id}`);
        continue
    }

    try {
        const values = {
            variable_symbol: inserted_invoice[0].variable_symbol,
            price: price / 100,
            price_calculation: price_calculation
        }
        console.log(values)
        const message_plaintext = await Nunjucks.render('email/invoice.plaintext.njk', values)
        const message_html = await Nunjucks.render('email/invoice.html.njk', values)
        console.log(message_plaintext)
        const info = await smtp.sendMail({
           from: `"noreply" <${process.env.SMTP_USER}>`,
           to: g.email,
           cc: process.env.MAIL_TO,
           bcc: process.env.MAIL_BCC,
           replyTo: process.env.MAIL_TO,
           subject: "Letný tábor UpGREAT - Informácie k platbe",
           text: message_plaintext,
           html: message_html
        });
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

const g2 = await db.query.guardianTable.findMany({
    with: {
        children: true,
        invoices: true
    }
});
for (const g of g2) {
    console.log(g)
}

const FioTransaction = Type.Object({
    column22: Type.Object({
        id: Type.Literal(22),
        name: Type.Literal("ID pohybu"),
        value: Type.Integer()
    }),
    column0: Type.Object({
        id: Type.Literal(0),
        name: Type.Literal("Datum"),
        value: Type.String({pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}"})
    }),
    column1: Type.Object({
        id: Type.Literal(1),
        name: Type.Literal("Objem"),
        value: Type.Integer()
    }),
    column14: Type.Object({
        id: Type.Literal(14),
        name: Type.Literal("Měna"),
        value: Type.String()
    }),
    column5: Type.Object({
        id: Type.Literal(5),
        name: Type.Literal("VS"),
        value: Type.String({pattern: "[0-9]{0,10}"})
    }),
    column8: Type.Object({
        id: Type.Literal(8),
        name: Type.Literal("Typ"),
        value: Type.String()
    })
})

const FioApi = Type.Object({
    accountStatement: Type.Object({
        info: Type.Object({}),
        transactionList: Type.Object({
            transaction: Type.Array(FioTransaction)
        })
    })
})

const validate = ajv.compile<Type.Static<typeof FioApi>>(FioApi)

const req = https.request({
    hostname: 'fioapi.fio.cz',
    path: `/v1/rest/periods/${process.env.FIO_TOKEN}/2026-07-01/2026-09-01/transactions.json`,
    method: 'GET'
}, (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk;
    });

    // Response complete
    res.on('end', async () => {
        const fioapi = JSON.parse(data)
        console.log(JSON.stringify(fioapi, null, "  "))

        if (!validate(fioapi)) {
            console.error("Validation error:")
            console.error(validate.errors)
            return
        }

        console.log(fioapi.accountStatement)
        const transactions = fioapi.accountStatement
                                   .transactionList
                                   .transaction
                                   .map((t) => { return {
            "transaction_id": t.column22.value,
            "transaction_date": t.column0.value,
            "amount": t.column1.value,
            "currency": t.column14.value,
            "variable_symbol": t.column5.value,
            "type": t.column8.value
        }})
        console.log(transactions)

        for (const t of transactions) {
            if (t.currency != "EUR") {
                console.error(`Wrong currency: ${t.currency} VS: ${t.variable_symbol}`)
                continue
            }
            if (!t.type.toLowerCase().includes("příchozí")) {
                console.error(`Wrong type: ${t.type} VS: ${t.variable_symbol}`)
                continue
            }

            const variable_symbol = Number(t.variable_symbol)

            const invoice = await db.query.invoiceTable.findFirst({
                where: {
                    variable_symbol: {eq: variable_symbol},
                    pay_until: {gte: new Date(t.transaction_date)},
                    created_at: {lte: new Date(t.transaction_date)}
                },
                with: {payments: true}
            })
            if (invoice == undefined) {
                console.error(`Invalid variable symbol: ${variable_symbol}`)
                continue
            }

            const payment: typeof paymentTable.$inferInsert = {
                amount_eur_cents: t.amount * 100,
                variable_symbol: variable_symbol,
                transaction_id: String(t.transaction_id),
                transaction_date: t.transaction_date,
                invoice_id: invoice.id
            }
            try {
                await db.insert(paymentTable).values(payment);
            }
            catch (e) {
                if (e instanceof DrizzleQueryError && e.cause && e.cause.message == 'duplicate key value violates unique constraint "payment_transaction_id_key"') {
                    continue
                }
                throw e
            }

            const invoice_paid_amount = invoice.payments.reduce((acc, p) => {
                    return acc + p.amount_eur_cents
                }, 0) + payment.amount_eur_cents
            if (invoice_paid_amount != invoice.amount_eur_cents) {
                const direction = invoice_paid_amount < invoice.amount_eur_cents ? "under" : "over"
                console.warn(`Invoice ${direction}paid: VS: ${variable_symbol} paid: ${invoice_paid_amount}/${invoice.amount_eur_cents}`)
            }
            if (invoice_paid_amount >= invoice.amount_eur_cents) {
                await db.update(invoiceTable).set({
                    fulfilled: true
                }).where(eq(invoiceTable.id, invoice.id))
                console.log(`Invoice fulfilled: VS: ${variable_symbol} paid: ${invoice_paid_amount}/${invoice.amount_eur_cents}`)
            }

            // TODO: Send email
        }
    });

}).on("error", (err) => {
    console.log("Error: ", err)
}).end()
