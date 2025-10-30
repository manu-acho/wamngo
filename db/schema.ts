import { integer, pgTable, varchar, text, timestamp, decimal, boolean, uuid, jsonb } from 'drizzle-orm/pg-core';

// Core user management
export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    walletAddress: varchar({ length: 42 }).notNull().unique(),
    username: varchar({ length: 50 }),
    email: varchar({ length: 255 }),
    bio: text(),
    profileImage: varchar({ length: 500 }),
    reputation: integer().default(0),
    createdAt: timestamp().notNull().defaultNow(),
    lastActive: timestamp()
});

// Governance system
export const proposals = pgTable('proposals', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    fundingAmount: decimal({ precision: 18, scale: 2 }),
    tokenAllocation: decimal({ precision: 18, scale: 2 }),
    category: varchar({ length: 50 }).notNull(),
    status: varchar({ length: 20 }).notNull().default('pending'), // pending, active, passed, rejected, executed
    createdBy: varchar({ length: 42 }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    votingEndsAt: timestamp(),
    votesFor: integer().default(0),
    votesAgainst: integer().default(0),
    totalStakeFor: decimal({ precision: 18, scale: 2 }).default('0'),
    totalStakeAgainst: decimal({ precision: 18, scale: 2 }).default('0'),
    metadata: jsonb()
});

export const votes = pgTable('votes', {
    id: uuid().primaryKey().defaultRandom(),
    proposalId: uuid().notNull(),
    voterWallet: varchar({ length: 42 }).notNull(),
    voteType: varchar({ length: 10 }).notNull(), // for, against, abstain
    stakeAmount: decimal({ precision: 18, scale: 2 }).notNull(),
    reason: text(),
    createdAt: timestamp().notNull().defaultNow()
});

export const daoMembers = pgTable('dao_members', {
    id: uuid().primaryKey().defaultRandom(),
    walletAddress: varchar({ length: 42 }).notNull().unique(),
    stakeAmount: decimal({ precision: 18, scale: 2 }).default('0'),
    reputationScore: integer().default(0),
    joinedAt: timestamp().notNull().defaultNow(),
    isActive: boolean().default(true)
});

// Project management
export const projects = pgTable('projects', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 100 }).notNull().unique(),
    description: text().notNull(),
    shortDescription: varchar({ length: 500 }),
    category: varchar({ length: 50 }).notNull(),
    status: varchar({ length: 20 }).notNull().default('pending'),
    fundingGoal: decimal({ precision: 18, scale: 2 }).notNull(),
    fundingRaised: decimal({ precision: 18, scale: 2 }).default('0'),
    tokenAllocation: decimal({ precision: 18, scale: 2 }),
    createdBy: varchar({ length: 42 }),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    imageUrl: varchar({ length: 500 }),
    metadata: jsonb()
});

export const projectSubmissions = pgTable('project_submissions', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    shortDescription: varchar({ length: 500 }),
    category: varchar({ length: 50 }).notNull(),
    fundingGoal: decimal({ precision: 18, scale: 2 }).notNull(),
    tokenAllocation: decimal({ precision: 18, scale: 2 }),
    technologyStack: jsonb(),
    targetBeneficiaries: integer(),
    expectedImpact: text(),
    timeline: jsonb(),
    teamMembers: jsonb(),
    status: varchar({ length: 20 }).notNull().default('submitted'), // submitted, under_review, approved, rejected
    submittedBy: varchar({ length: 42 }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    reviewedAt: timestamp(),
    reviewComments: text()
});

export const projectUpdates = pgTable('project_updates', {
    id: uuid().primaryKey().defaultRandom(),
    projectId: uuid().notNull(),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull(),
    updateType: varchar({ length: 20 }).notNull(), // milestone, progress, news
    postedAt: timestamp().notNull().defaultNow(),
    postedBy: varchar({ length: 42 }).notNull()
});

export const projectMetrics = pgTable('project_metrics', {
    id: uuid().primaryKey().defaultRandom(),
    projectId: uuid().notNull(),
    metricName: varchar({ length: 100 }).notNull(),
    currentValue: decimal({ precision: 18, scale: 2 }).notNull(),
    targetValue: decimal({ precision: 18, scale: 2 }),
    unit: varchar({ length: 20 }),
    updatedAt: timestamp().notNull().defaultNow()
});

// Token sale and transactions
export const tokenPurchases = pgTable('token_purchases', {
    id: uuid().primaryKey().defaultRandom(),
    walletAddress: varchar({ length: 42 }).notNull(),
    amountUsd: decimal({ precision: 18, scale: 2 }).notNull(),
    amountTokens: decimal({ precision: 18, scale: 2 }).notNull(),
    tokenPrice: decimal({ precision: 18, scale: 8 }).notNull(),
    txHash: varchar({ length: 66 }),
    status: varchar({ length: 20 }).notNull().default('pending'), // pending, confirmed, failed
    referralCode: varchar({ length: 20 }),
    createdAt: timestamp().notNull().defaultNow(),
    confirmedAt: timestamp()
});

export const stakingPositions = pgTable('staking_positions', {
    id: uuid().primaryKey().defaultRandom(),
    walletAddress: varchar({ length: 42 }).notNull(),
    amountStaked: decimal({ precision: 18, scale: 2 }).notNull(),
    rewardsEarned: decimal({ precision: 18, scale: 2 }).default('0'),
    stakedAt: timestamp().notNull().defaultNow(),
    lastClaimAt: timestamp(),
    isActive: boolean().default(true)
});

// Communication
export const contactSubmissions = pgTable('contact_submissions', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    subject: varchar({ length: 255 }).notNull(),
    message: text().notNull(),
    status: varchar({ length: 20 }).notNull().default('new'), // new, in_progress, resolved
    createdAt: timestamp().notNull().defaultNow(),
    respondedAt: timestamp(),
    adminNotes: text()
});

export const notifications = pgTable('notifications', {
    id: uuid().primaryKey().defaultRandom(),
    recipient: varchar({ length: 42 }).notNull(),
    type: varchar({ length: 50 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    message: text().notNull(),
    metadata: jsonb(),
    readAt: timestamp(),
    createdAt: timestamp().notNull().defaultNow()
});

// Analytics
export const platformStats = pgTable('platform_stats', {
    id: uuid().primaryKey().defaultRandom(),
    metricName: varchar({ length: 100 }).notNull().unique(),
    currentValue: decimal({ precision: 18, scale: 2 }).notNull(),
    previousValue: decimal({ precision: 18, scale: 2 }),
    lastUpdated: timestamp().notNull().defaultNow(),
    metadata: jsonb()
});

export const userActions = pgTable('user_actions', {
    id: uuid().primaryKey().defaultRandom(),
    walletAddress: varchar({ length: 42 }),
    actionType: varchar({ length: 50 }).notNull(),
    targetId: varchar({ length: 100 }),
    metadata: jsonb(),
    createdAt: timestamp().notNull().defaultNow()
});

// Legacy posts table (keeping for backwards compatibility)
export const posts = pgTable('posts', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull().default('')
});