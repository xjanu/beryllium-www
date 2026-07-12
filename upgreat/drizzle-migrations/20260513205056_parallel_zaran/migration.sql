CREATE TYPE "public"."gender" AS ENUM('female', 'male');--> statement-breakpoint
CREATE TABLE "child" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "child_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"guardian_id" integer,
	"forename" text NOT NULL,
	"surname" text NOT NULL,
	"gender" "gender" NOT NULL,
	"date_of_birth" date NOT NULL,
	"municipality" text NOT NULL,
	"street_with_number" text NOT NULL,
	"postal_code" text NOT NULL,
	"days_all" boolean NOT NULL,
	"days_mon" boolean NOT NULL,
	"days_tue" boolean NOT NULL,
	"days_wed" boolean NOT NULL,
	"days_thu" boolean NOT NULL,
	"days_fri" boolean NOT NULL,
	"more_info" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guardian" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "guardian_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"tel" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "child" ADD CONSTRAINT "child_guardian_id_guardian_id_fk" FOREIGN KEY ("guardian_id") REFERENCES "public"."guardian"("id") ON DELETE no action ON UPDATE no action;