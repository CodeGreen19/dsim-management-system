ALTER TYPE "public"."course" ADD VALUE 'taishir' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Mizan' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Nahbemir' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Hedayetun nahu' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Kafiya' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Shorhe jami' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Shorhe bekaya' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Jalalain ' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Meshkat' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TYPE "public"."course" ADD VALUE 'Dawra' BEFORE 'Moqtob';--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "session_range" SET DEFAULT 'ramadan_1445_ramadan_1446';--> statement-breakpoint
ALTER TABLE "public"."students" ALTER COLUMN "session_range" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."session_range";--> statement-breakpoint
CREATE TYPE "public"."session_range" AS ENUM('no_session', 'ramadan_1444_ramadan_1445', 'ramadan_1445_ramadan_1446', 'ramadan_1446_ramadan_1447', 'ramadan_1447_ramadan_1448', 'ramadan_1448_ramadan_1449', 'ramadan_1449_ramadan_1450', 'ramadan_1450_ramadan_1451', 'ramadan_1451_ramadan_1452');--> statement-breakpoint
ALTER TABLE "public"."students" ALTER COLUMN "session_range" SET DATA TYPE "public"."session_range" USING "session_range"::"public"."session_range";