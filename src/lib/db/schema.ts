import { pgTable, serial, text, varchar, integer, decimal, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 500 }),
  category: varchar('category', { length: 100 }).notNull(), // 'health', 'agriculture', 'education', 'reconstruction'
  technologyStack: jsonb('technology_stack'), // Array of technologies
  fundingGoal: decimal('funding_goal', { precision: 15, scale: 2 }).notNull(),
  fundingRaised: decimal('funding_raised', { precision: 15, scale: 2 }).default('0'),
  tokenAllocation: integer('token_allocation'), // WAMTokens allocated
  status: varchar('status', { length: 50 }).default('proposed'), // 'proposed', 'active', 'completed', 'paused'
  imageUrl: varchar('image_url', { length: 500 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  impactGoals: jsonb('impact_goals'), // Key metrics and targets
  partnerships: jsonb('partnerships'), // Partner organizations
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Project milestones
export const projectMilestones = pgTable('project_milestones', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  targetDate: timestamp('target_date'),
  completedDate: timestamp('completed_date'),
  fundingRequired: decimal('funding_required', { precision: 15, scale: 2 }),
  status: varchar('status', { length: 50 }).default('pending'), // 'pending', 'in_progress', 'completed', 'delayed'
  deliverables: jsonb('deliverables'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Project updates and progress reports
export const projectUpdates = pgTable('project_updates', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  updateType: varchar('update_type', { length: 50 }).notNull(), // 'progress', 'milestone', 'funding', 'impact'
  metrics: jsonb('metrics'), // Key performance indicators
  imageUrl: varchar('image_url', { length: 500 }),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Impact tracking
export const impactMetrics = pgTable('impact_metrics', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  metricName: varchar('metric_name', { length: 255 }).notNull(),
  currentValue: decimal('current_value', { precision: 15, scale: 2 }),
  targetValue: decimal('target_value', { precision: 15, scale: 2 }),
  unit: varchar('unit', { length: 50 }),
  category: varchar('category', { length: 100 }), // 'health', 'economic', 'social', 'environmental'
  recordedDate: timestamp('recorded_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Funding rounds (for Web3 integration)
export const fundingRounds = pgTable('funding_rounds', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  roundName: varchar('round_name', { length: 255 }).notNull(),
  targetAmount: decimal('target_amount', { precision: 15, scale: 2 }).notNull(),
  raisedAmount: decimal('raised_amount', { precision: 15, scale: 2 }).default('0'),
  tokenPrice: decimal('token_price', { precision: 18, scale: 8 }),
  tokensOffered: integer('tokens_offered'),
  tokensSold: integer('tokens_sold').default(0),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  isActive: boolean('is_active').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Export types for TypeScript
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectMilestone = typeof projectMilestones.$inferSelect;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;
export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type FundingRound = typeof fundingRounds.$inferSelect;
