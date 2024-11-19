-- Add column if not exists role
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" text;
ALTER TABLE "users" RENAME COLUMN "role" TO "type";