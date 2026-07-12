import { defineRelations } from "drizzle-orm";

import { guardianTable, childTable, invoiceTable, paymentTable } from "./schema.ts"

export const relations = defineRelations({
        guardianTable, childTable, invoiceTable, paymentTable
    }, (r) => ({
    guardianTable: {
        children: r.many.childTable({
            from: r.guardianTable.id,
            to: r.childTable.guardian_id
        }),
        invoices: r.many.invoiceTable({
            from: r.guardianTable.id,
            to: r.invoiceTable.guardian_id
        })
    },
    childTable: {
        guardian: r.one.guardianTable()
    },
    invoiceTable: {
        payments: r.many.paymentTable({
            from: r.invoiceTable.id,
            to: r.paymentTable.invoice_id
        })
    },
    paymentTable: {
        invoice: r.one.invoiceTable()
    }
}));
