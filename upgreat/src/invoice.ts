import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import nodemailer from 'nodemailer'
import Nunjucks from 'nunjucks'

import { relations } from "./db/relations.ts";
import { invoiceTable } from './db/schema.ts';

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
            "price": price / 100
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
                pay_until: new Date("2026-08-09T00:00:00")
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

    // TODO: Send email
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
           to: process.env.MAIL_TO,
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
