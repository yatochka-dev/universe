import {
  type MigrateUpArgs,
  type MigrateDownArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" ALTER COLUMN "inquiry_type" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "discord_community_url" SET DEFAULT 'https://example.com';
  ALTER TABLE "settings" ADD COLUMN "discord_contact_notification_webhook_url" varchar DEFAULT 'https://example.com' NOT NULL;`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" ALTER COLUMN "inquiry_type" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "discord_community_url" DROP DEFAULT;
  ALTER TABLE "settings" DROP COLUMN "discord_contact_notification_webhook_url";`);
}
