import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contacts_inquiry_type" AS ENUM('general', 'partnership', 'speaking', 'sponsor', 'join-team', 'media');
  ALTER TABLE "contacts" ADD COLUMN "inquiry_type" "enum_contacts_inquiry_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" DROP COLUMN "inquiry_type";
  DROP TYPE "public"."enum_contacts_inquiry_type";`)
}
