import { pgTable, pgEnum, boolean, integer, date, timestamp, text } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["female", "male"])

export const guardianTable = pgTable("guardian", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull(),
  tel: text().notNull(),
  created_at: timestamp().notNull().defaultNow()
});

export const childTable = pgTable("child", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  guardian_id: integer().references(() => guardianTable.id),
  forename: text().notNull(),
  surname: text().notNull(),
  gender: genderEnum().notNull(),
  date_of_birth: date().notNull(),
  municipality: text().notNull(),
  street_with_number: text().notNull(),
  postal_code: text().notNull(),
  days_mon: boolean().notNull(),
  days_tue: boolean().notNull(),
  days_wed: boolean().notNull(),
  days_thu: boolean().notNull(),
  days_fri: boolean().notNull(),
  more_info: text(),
  created_at: timestamp().notNull().defaultNow()
});

export const invoiceTable = pgTable("invoice", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  guardian_id: integer().references(() => guardianTable.id),
  amount_eur_cents: integer().notNull(),
  variable_symbol: integer().unique().notNull(),
  fulfilled: boolean().notNull().default(false),
  pay_until: timestamp().notNull(),
  created_at: timestamp().notNull().defaultNow()
})

export const paymentTable = pgTable("payment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  invoice_id: integer().references(() => invoiceTable.id),
  amount_eur_cents: integer().notNull(),
  variable_symbol: integer().notNull(),
  transaction_id: text().unique().notNull(),  // Unique transaction id from bank
  transaction_date: date().notNull(),         // Transaction date from bank
  created_at: timestamp().notNull().defaultNow()
})
