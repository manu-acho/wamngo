CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"respondedAt" timestamp,
	"adminNotes" text
);
--> statement-breakpoint
CREATE TABLE "dao_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(42) NOT NULL,
	"stakeAmount" numeric(18, 2) DEFAULT '0',
	"reputationScore" integer DEFAULT 0,
	"joinedAt" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true,
	CONSTRAINT "dao_members_walletAddress_unique" UNIQUE("walletAddress")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipient" varchar(42) NOT NULL,
	"type" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"metadata" jsonb,
	"readAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metricName" varchar(100) NOT NULL,
	"currentValue" numeric(18, 2) NOT NULL,
	"previousValue" numeric(18, 2),
	"lastUpdated" timestamp DEFAULT now() NOT NULL,
	"metadata" jsonb,
	CONSTRAINT "platform_stats_metricName_unique" UNIQUE("metricName")
);
--> statement-breakpoint
CREATE TABLE "project_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"metricName" varchar(100) NOT NULL,
	"currentValue" numeric(18, 2) NOT NULL,
	"targetValue" numeric(18, 2),
	"unit" varchar(20),
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"shortDescription" varchar(500),
	"category" varchar(50) NOT NULL,
	"fundingGoal" numeric(18, 2) NOT NULL,
	"tokenAllocation" numeric(18, 2),
	"technologyStack" jsonb,
	"targetBeneficiaries" integer,
	"expectedImpact" text,
	"timeline" jsonb,
	"teamMembers" jsonb,
	"status" varchar(20) DEFAULT 'submitted' NOT NULL,
	"submittedBy" varchar(42) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"reviewedAt" timestamp,
	"reviewComments" text
);
--> statement-breakpoint
CREATE TABLE "project_updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"updateType" varchar(20) NOT NULL,
	"postedAt" timestamp DEFAULT now() NOT NULL,
	"postedBy" varchar(42) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"shortDescription" varchar(500),
	"category" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"fundingGoal" numeric(18, 2) NOT NULL,
	"fundingRaised" numeric(18, 2) DEFAULT '0',
	"tokenAllocation" numeric(18, 2),
	"createdBy" varchar(42),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"imageUrl" varchar(500),
	"metadata" jsonb,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"fundingAmount" numeric(18, 2),
	"tokenAllocation" numeric(18, 2),
	"category" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"createdBy" varchar(42) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"votingEndsAt" timestamp,
	"votesFor" integer DEFAULT 0,
	"votesAgainst" integer DEFAULT 0,
	"totalStakeFor" numeric(18, 2) DEFAULT '0',
	"totalStakeAgainst" numeric(18, 2) DEFAULT '0',
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "staking_positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(42) NOT NULL,
	"amountStaked" numeric(18, 2) NOT NULL,
	"rewardsEarned" numeric(18, 2) DEFAULT '0',
	"stakedAt" timestamp DEFAULT now() NOT NULL,
	"lastClaimAt" timestamp,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "token_purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(42) NOT NULL,
	"amountUsd" numeric(18, 2) NOT NULL,
	"amountTokens" numeric(18, 2) NOT NULL,
	"tokenPrice" numeric(18, 8) NOT NULL,
	"txHash" varchar(66),
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"referralCode" varchar(20),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"confirmedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(42),
	"actionType" varchar(50) NOT NULL,
	"targetId" varchar(100),
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(42) NOT NULL,
	"username" varchar(50),
	"email" varchar(255),
	"bio" text,
	"profileImage" varchar(500),
	"reputation" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"lastActive" timestamp,
	CONSTRAINT "users_walletAddress_unique" UNIQUE("walletAddress")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposalId" uuid NOT NULL,
	"voterWallet" varchar(42) NOT NULL,
	"voteType" varchar(10) NOT NULL,
	"stakeAmount" numeric(18, 2) NOT NULL,
	"reason" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
