CREATE TABLE "admin_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adminWallet" varchar(42) NOT NULL,
	"actionType" varchar(50) NOT NULL,
	"targetType" varchar(20) NOT NULL,
	"targetId" varchar(100),
	"reason" text,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(42) NOT NULL,
	"role" varchar(20) NOT NULL,
	"permissions" jsonb,
	"grantedBy" varchar(42),
	"grantedAt" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true,
	CONSTRAINT "admin_roles_walletAddress_unique" UNIQUE("walletAddress")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "deletedBy" varchar(42);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "deleteReason" text;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "deletedBy" varchar(42);--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "deleteReason" text;