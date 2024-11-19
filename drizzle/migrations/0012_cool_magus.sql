CREATE TABLE IF NOT EXISTS "masterPaymentMethod" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "masterVendor" (
	"id" text PRIMARY KEY NOT NULL,
	"vendorName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sitePaymentMethod" (
	"id" text PRIMARY KEY NOT NULL,
	"masterPaymentMethodId" text,
	"siteId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "siteVendor" (
	"id" text PRIMARY KEY NOT NULL,
	"masterVendorId" text,
	"siteId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitePaymentMethod" ADD CONSTRAINT "sitePaymentMethod_masterPaymentMethodId_masterPaymentMethod_id_fk" FOREIGN KEY ("masterPaymentMethodId") REFERENCES "public"."masterPaymentMethod"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitePaymentMethod" ADD CONSTRAINT "sitePaymentMethod_siteId_sites_id_fk" FOREIGN KEY ("siteId") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "siteVendor" ADD CONSTRAINT "siteVendor_masterVendorId_masterVendor_id_fk" FOREIGN KEY ("masterVendorId") REFERENCES "public"."masterVendor"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "siteVendor" ADD CONSTRAINT "siteVendor_siteId_sites_id_fk" FOREIGN KEY ("siteId") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
