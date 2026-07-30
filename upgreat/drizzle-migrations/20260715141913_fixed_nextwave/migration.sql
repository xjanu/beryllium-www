ALTER TABLE "payment" ADD COLUMN "transaction_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "transaction_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_transaction_id_key" UNIQUE("transaction_id");