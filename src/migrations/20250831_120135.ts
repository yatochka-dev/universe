import {
  type MigrateUpArgs,
  type MigrateDownArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resource_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar DEFAULT '' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show" boolean DEFAULT true NOT NULL,
  	"name" varchar DEFAULT 'Twitter' NOT NULL,
  	"icon" varchar DEFAULT 'MessageCircle' NOT NULL,
  	"link" varchar DEFAULT 'https://example.com' NOT NULL
  );
  
  CREATE TABLE "contact_page_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"faq_show" boolean DEFAULT true,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v_version_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_subtitle" varchar,
  	"version_faq_show" boolean DEFAULT true,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "contacts" ALTER COLUMN "inquiry_type" DROP NOT NULL;
  ALTER TABLE "hero_section" ALTER COLUMN "top_badge_emoji" DROP DEFAULT;
  ALTER TABLE "_hero_section_v" ALTER COLUMN "version_top_badge_emoji" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "resource_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "settings" ADD COLUMN "direct_contact_email" varchar NOT NULL;
  ALTER TABLE "hero_section" ADD COLUMN "icon" varchar;
  ALTER TABLE "_hero_section_v" ADD COLUMN "version_icon" varchar;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_type_id_resource_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."resource_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_socials" ADD CONSTRAINT "settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_faq_questions" ADD CONSTRAINT "contact_page_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_faq_questions" ADD CONSTRAINT "_contact_page_v_version_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "resources_type_idx" ON "resources" USING btree ("type_id");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "resource_types_updated_at_idx" ON "resource_types" USING btree ("updated_at");
  CREATE INDEX "resource_types_created_at_idx" ON "resource_types" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "settings_socials_order_idx" ON "settings_socials" USING btree ("_order");
  CREATE INDEX "settings_socials_parent_id_idx" ON "settings_socials" USING btree ("_parent_id");
  CREATE INDEX "contact_page_faq_questions_order_idx" ON "contact_page_faq_questions" USING btree ("_order");
  CREATE INDEX "contact_page_faq_questions_parent_id_idx" ON "contact_page_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_faq_questions_order_idx" ON "_contact_page_v_version_faq_questions" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_faq_questions_parent_id_idx" ON "_contact_page_v_version_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resource_types_fk" FOREIGN KEY ("resource_types_id") REFERENCES "public"."resource_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_resource_types_id_idx" ON "payload_locked_documents_rels" USING btree ("resource_types_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resource_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "resource_types" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "settings_socials" CASCADE;
  DROP TABLE "contact_page_faq_questions" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v_version_faq_questions" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resource_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  DROP INDEX "payload_locked_documents_rels_resources_id_idx";
  DROP INDEX "payload_locked_documents_rels_resource_types_id_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  ALTER TABLE "contacts" ALTER COLUMN "inquiry_type" SET NOT NULL;
  ALTER TABLE "hero_section" ALTER COLUMN "top_badge_emoji" SET DEFAULT '🚀';
  ALTER TABLE "_hero_section_v" ALTER COLUMN "version_top_badge_emoji" SET DEFAULT '🚀';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "resources_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "resource_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  ALTER TABLE "settings" DROP COLUMN "direct_contact_email";
  ALTER TABLE "hero_section" DROP COLUMN "icon";
  ALTER TABLE "_hero_section_v" DROP COLUMN "version_icon";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";`);
}
