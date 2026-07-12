ALTER TABLE "invoice" ALTER COLUMN "fulfilled" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_variable_symbol_key" UNIQUE("variable_symbol");