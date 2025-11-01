import { db } from '../../../db';
import { 
  users, 
  proposals, 
  votes, 
  daoMembers,
  projects,
  projectSubmissions,
  projectUpdates,
  projectMetrics,
  tokenPurchases,
  stakingPositions,
  contactSubmissions,
  notifications,
  platformStats,
  userActions,
  adminRoles,
  adminActions,
  partners,
  partnerApplications
} from '../../../db/schema';
import { eq, desc, and, sql, count, isNull } from 'drizzle-orm';

// User services
export const userService = {
  async createUser(data: {
    walletAddress: string;
    username?: string;
    email?: string;
    bio?: string;
  }) {
    const [user] = await db.insert(users).values({
      walletAddress: data.walletAddress,
      username: data.username,
      email: data.email,
      bio: data.bio,
    }).returning();
    return user;
  },

  async getUserByWallet(walletAddress: string) {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return user;
  },

  async updateUser(walletAddress: string, data: Partial<typeof users.$inferInsert>) {
    const [user] = await db
      .update(users)
      .set({ ...data, lastActive: new Date() })
      .where(eq(users.walletAddress, walletAddress))
      .returning();
    return user;
  },

  async getTotalUsers() {
    const [result] = await db.select({ count: count() }).from(users);
    return result.count;
  },

  async getUserStats(walletAddress: string) {
    const [userVotes] = await db
      .select({ count: count() })
      .from(votes)
      .where(eq(votes.voterWallet, walletAddress));

    const [userProposals] = await db
      .select({ count: count() })
      .from(proposals)
      .where(eq(proposals.createdBy, walletAddress));

    const [stakingPosition] = await db
      .select()
      .from(stakingPositions)
      .where(and(
        eq(stakingPositions.walletAddress, walletAddress),
        eq(stakingPositions.isActive, true)
      ));

    return {
      votesCount: userVotes.count,
      proposalsCount: userProposals.count,
      stakingAmount: stakingPosition?.amountStaked || '0',
      rewardsEarned: stakingPosition?.rewardsEarned || '0'
    };
  }
};

// Governance services
export const governanceService = {
  async createProposal(data: {
    title: string;
    description: string;
    fundingAmount?: string;
    tokenAllocation?: string;
    category: string;
    createdBy: string;
    votingEndsAt: Date;
  }) {
    const [proposal] = await db.insert(proposals).values({
      ...data,
      status: 'active'
    }).returning();
    return proposal;
  },

  async getProposals(status?: string) {
    if (status) {
      return await db
        .select()
        .from(proposals)
        .where(and(eq(proposals.status, status), isNull(proposals.deletedAt)))
        .orderBy(desc(proposals.createdAt));
    }
    return await db
      .select()
      .from(proposals)
      .where(isNull(proposals.deletedAt))
      .orderBy(desc(proposals.createdAt));
  },

  async getProposal(id: string) {
    const [proposal] = await db.select().from(proposals).where(eq(proposals.id, id));
    return proposal;
  },

  async castVote(data: {
    proposalId: string;
    voterWallet: string;
    voteType: 'for' | 'against' | 'abstain';
    stakeAmount: string;
    reason?: string;
  }) {
    const [vote] = await db.insert(votes).values(data).returning();
    
    // Update proposal vote counts
    if (data.voteType === 'for') {
      await db
        .update(proposals)
        .set({
          votesFor: sql`${proposals.votesFor} + 1`,
          totalStakeFor: sql`${proposals.totalStakeFor} + ${data.stakeAmount}`
        })
        .where(eq(proposals.id, data.proposalId));
    } else if (data.voteType === 'against') {
      await db
        .update(proposals)
        .set({
          votesAgainst: sql`${proposals.votesAgainst} + 1`,
          totalStakeAgainst: sql`${proposals.totalStakeAgainst} + ${data.stakeAmount}`
        })
        .where(eq(proposals.id, data.proposalId));
    }

    return vote;
  },

  async getProposalVotes(proposalId: string) {
    return await db.select().from(votes).where(eq(votes.proposalId, proposalId));
  },

  async hasUserVoted(proposalId: string, voterWallet: string) {
    const [vote] = await db
      .select()
      .from(votes)
      .where(and(
        eq(votes.proposalId, proposalId),
        eq(votes.voterWallet, voterWallet)
      ));
    return !!vote;
  },

  async getTotalProposals() {
    const [result] = await db.select({ count: count() }).from(proposals);
    return result.count;
  },

  async getTotalVotes() {
    const [result] = await db.select({ count: count() }).from(votes);
    return result.count;
  },

  async getActiveProposalsCount() {
    const [result] = await db
      .select({ count: count() })
      .from(proposals)
      .where(eq(proposals.status, 'active'));
    return result.count;
  },

  async getProposalStats() {
    const [active] = await db
      .select({ count: count() })
      .from(proposals)
      .where(eq(proposals.status, 'active'));
    
    const [completed] = await db
      .select({ count: count() })
      .from(proposals)
      .where(eq(proposals.status, 'completed'));
    
    const [rejected] = await db
      .select({ count: count() })
      .from(proposals)
      .where(eq(proposals.status, 'rejected'));
    
    return {
      active: active.count,
      completed: completed.count,
      rejected: rejected.count
    };
  }
};

// Project services
export const projectService = {
  async createProjectSubmission(data: {
    title: string;
    description: string;
    shortDescription?: string;
    category: string;
    fundingGoal: string;
    tokenAllocation?: string;
    technologyStack?: any;
    targetBeneficiaries?: number;
    expectedImpact?: string;
    timeline?: any;
    teamMembers?: any;
    submittedBy: string;
  }) {
    const [submission] = await db.insert(projectSubmissions).values(data).returning();
    return submission;
  },

  async getProjectSubmissions(status?: string) {
    const query = db.select().from(projectSubmissions);
    if (status) {
      return await query.where(eq(projectSubmissions.status, status));
    }
    return await query.orderBy(desc(projectSubmissions.createdAt));
  },

  async getProjectSubmission(id: string) {
    const [submission] = await db
      .select()
      .from(projectSubmissions)
      .where(eq(projectSubmissions.id, id));
    return submission;
  },

  async updateProjectSubmissionStatus(id: string, status: string, reviewComments?: string) {
    const [submission] = await db
      .update(projectSubmissions)
      .set({
        status,
        reviewComments,
        reviewedAt: new Date()
      })
      .where(eq(projectSubmissions.id, id))
      .returning();
    return submission;
  },

  async getProjects() {
    return await db
      .select()
      .from(projects)
      .where(isNull(projects.deletedAt))
      .orderBy(desc(projects.createdAt));
  },

  async getProject(slug: string) {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  },

  async createProjectUpdate(data: {
    projectId: string;
    title: string;
    content: string;
    updateType: 'milestone' | 'progress' | 'news';
    postedBy: string;
  }) {
    const [update] = await db.insert(projectUpdates).values(data).returning();
    return update;
  },

  async getProjectUpdates(projectId: string) {
    return await db
      .select()
      .from(projectUpdates)
      .where(eq(projectUpdates.projectId, projectId))
      .orderBy(desc(projectUpdates.postedAt));
  },

  async updateProjectMetrics(projectId: string, metrics: Array<{
    metricName: string;
    currentValue: string;
    targetValue?: string;
    unit?: string;
  }>) {
    for (const metric of metrics) {
      await db
        .insert(projectMetrics)
        .values({
          projectId,
          ...metric
        })
        .onConflictDoUpdate({
          target: [projectMetrics.projectId, projectMetrics.metricName],
          set: {
            currentValue: metric.currentValue,
            targetValue: metric.targetValue,
            unit: metric.unit,
            updatedAt: new Date()
          }
        });
    }
  }
};

// Token and transaction services
export const tokenService = {
  async recordTokenPurchase(data: {
    walletAddress: string;
    amountUsd: string;
    amountTokens: string;
    tokenPrice: string;
    txHash?: string;
    referralCode?: string;
  }) {
    const [purchase] = await db.insert(tokenPurchases).values(data).returning();
    return purchase;
  },

  async confirmTokenPurchase(id: string, txHash: string) {
    const [purchase] = await db
      .update(tokenPurchases)
      .set({
        status: 'confirmed',
        txHash,
        confirmedAt: new Date()
      })
      .where(eq(tokenPurchases.id, id))
      .returning();
    return purchase;
  },

  async getUserPurchases(walletAddress: string) {
    return await db
      .select()
      .from(tokenPurchases)
      .where(eq(tokenPurchases.walletAddress, walletAddress))
      .orderBy(desc(tokenPurchases.createdAt));
  },

  async createStakingPosition(data: {
    walletAddress: string;
    amountStaked: string;
  }) {
    const [position] = await db.insert(stakingPositions).values(data).returning();
    return position;
  },

  async updateStakingRewards(walletAddress: string, rewardsEarned: string) {
    const [position] = await db
      .update(stakingPositions)
      .set({
        rewardsEarned,
        lastClaimAt: new Date()
      })
      .where(and(
        eq(stakingPositions.walletAddress, walletAddress),
        eq(stakingPositions.isActive, true)
      ))
      .returning();
    return position;
  },

  async getTotalTokensPurchased() {
    const [result] = await db
      .select({ 
        total: sql<number>`CAST(COALESCE(SUM(CAST(${tokenPurchases.amountTokens} AS DECIMAL)), 0) AS INTEGER)`
      })
      .from(tokenPurchases)
      .where(eq(tokenPurchases.status, 'confirmed'));
    return result.total || 0;
  }
};

// Communication services
export const communicationService = {
  async createContactSubmission(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  },

  async getContactSubmissions(status?: string) {
    const query = db.select().from(contactSubmissions);
    if (status) {
      return await query.where(eq(contactSubmissions.status, status));
    }
    return await query.orderBy(desc(contactSubmissions.createdAt));
  },

  async updateContactSubmissionStatus(id: string, status: string, adminNotes?: string) {
    const [submission] = await db
      .update(contactSubmissions)
      .set({
        status,
        adminNotes,
        respondedAt: new Date()
      })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return submission;
  },

  async createNotification(data: {
    recipient: string;
    type: string;
    title: string;
    message: string;
    metadata?: any;
  }) {
    const [notification] = await db.insert(notifications).values(data).returning();
    return notification;
  },

  async getUserNotifications(walletAddress: string, unreadOnly = false) {
    if (unreadOnly) {
      return await db
        .select()
        .from(notifications)
        .where(and(
          eq(notifications.recipient, walletAddress),
          isNull(notifications.readAt)
        ))
        .orderBy(desc(notifications.createdAt));
    }
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.recipient, walletAddress))
      .orderBy(desc(notifications.createdAt));
  },

  async markNotificationRead(id: string) {
    const [notification] = await db
      .update(notifications)
      .set({ readAt: new Date() })
      .where(eq(notifications.id, id))
      .returning();
    return notification;
  }
};

// Analytics services
export const analyticsService = {
  async updatePlatformStat(metricName: string, currentValue: string, metadata?: any) {
    const [stat] = await db
      .insert(platformStats)
      .values({
        metricName,
        currentValue,
        metadata
      })
      .onConflictDoUpdate({
        target: platformStats.metricName,
        set: {
          previousValue: platformStats.currentValue,
          currentValue,
          lastUpdated: new Date(),
          metadata
        }
      })
      .returning();
    return stat;
  },

  async getPlatformStats() {
    return await db.select().from(platformStats);
  },

  async recordUserAction(data: {
    walletAddress?: string;
    actionType: string;
    targetId?: string;
    metadata?: any;
  }) {
    const [action] = await db.insert(userActions).values(data).returning();
    return action;
  },

  async getUserActions(walletAddress: string, actionType?: string) {
    if (actionType) {
      return await db
        .select()
        .from(userActions)
        .where(and(
          eq(userActions.walletAddress, walletAddress),
          eq(userActions.actionType, actionType)
        ))
        .orderBy(desc(userActions.createdAt));
    }
    return await db
      .select()
      .from(userActions)
      .where(eq(userActions.walletAddress, walletAddress))
      .orderBy(desc(userActions.createdAt));
  },

  async getRecentActivity(limit = 50) {
    return await db
      .select()
      .from(userActions)
      .orderBy(desc(userActions.createdAt))
      .limit(limit);
  },

  async getActiveUsersCount(startDate: Date, endDate: Date) {
    const [result] = await db
      .select({ count: count() })
      .from(users)
      .where(and(
        sql`${users.lastActive} >= ${startDate.toISOString()}`,
        sql`${users.lastActive} <= ${endDate.toISOString()}`
      ));
    return result.count;
  }
};

// Admin services
export const adminService = {
  async createAdminRole(data: {
    walletAddress: string;
    role: 'super_admin' | 'moderator' | 'reviewer';
    permissions?: any;
    grantedBy: string;
  }) {
    const [adminRole] = await db.insert(adminRoles).values(data).returning();
    
    // Log the action
    await this.logAdminAction({
      adminWallet: data.grantedBy,
      actionType: 'grant_admin_role',
      targetType: 'user',
      targetId: data.walletAddress,
      metadata: { role: data.role, permissions: data.permissions }
    });
    
    return adminRole;
  },

  async getAdminRole(walletAddress: string) {
    const [role] = await db
      .select()
      .from(adminRoles)
      .where(and(
        eq(adminRoles.walletAddress, walletAddress),
        eq(adminRoles.isActive, true)
      ));
    return role;
  },

  async isAdmin(walletAddress: string): Promise<boolean> {
    const role = await this.getAdminRole(walletAddress);
    return !!role;
  },

  async hasPermission(walletAddress: string, permission: string): Promise<boolean> {
    const role = await this.getAdminRole(walletAddress);
    if (!role) return false;
    
    // Super admin has all permissions
    if (role.role === 'super_admin') return true;
    
    // Check specific permissions
    const permissions = role.permissions as any;
    return permissions && permissions[permission] === true;
  },

  async revokeAdminRole(walletAddress: string, revokedBy: string) {
    const [role] = await db
      .update(adminRoles)
      .set({ isActive: false })
      .where(eq(adminRoles.walletAddress, walletAddress))
      .returning();
    
    // Log the action
    await this.logAdminAction({
      adminWallet: revokedBy,
      actionType: 'revoke_admin_role',
      targetType: 'user',
      targetId: walletAddress,
      metadata: { previousRole: role?.role }
    });
    
    return role;
  },

  async getAllAdmins() {
    return await db
      .select()
      .from(adminRoles)
      .where(eq(adminRoles.isActive, true))
      .orderBy(desc(adminRoles.grantedAt));
  },

  async logAdminAction(data: {
    adminWallet: string;
    actionType: string;
    targetType: string;
    targetId?: string;
    reason?: string;
    metadata?: any;
  }) {
    const [action] = await db.insert(adminActions).values(data).returning();
    return action;
  },

  async getAdminActions(adminWallet?: string, limit = 50) {
    const query = db.select().from(adminActions);
    if (adminWallet) {
      return await query
        .where(eq(adminActions.adminWallet, adminWallet))
        .orderBy(desc(adminActions.createdAt))
        .limit(limit);
    }
    return await query
      .orderBy(desc(adminActions.createdAt))
      .limit(limit);
  },

  async updateProposal(id: string, data: {
    title?: string;
    description?: string;
    fundingAmount?: string;
    tokenAllocation?: string;
    category?: string;
    status?: string;
  }, adminWallet: string) {
    const [proposal] = await db
      .update(proposals)
      .set(data)
      .where(eq(proposals.id, id))
      .returning();
    
    // Log the action
    await this.logAdminAction({
      adminWallet,
      actionType: 'edit_proposal',
      targetType: 'proposal',
      targetId: id,
      metadata: data
    });
    
    return proposal;
  },

  async deleteProposal(id: string, adminWallet: string, reason?: string) {
    const [proposal] = await db
      .update(proposals)
      .set({
        deletedAt: new Date(),
        deletedBy: adminWallet,
        deleteReason: reason
      })
      .where(eq(proposals.id, id))
      .returning();
    
    // Log the action
    await this.logAdminAction({
      adminWallet,
      actionType: 'delete_proposal',
      targetType: 'proposal',
      targetId: id,
      reason,
      metadata: { title: proposal?.title }
    });
    
    return proposal;
  },

  async updateProject(id: string, data: {
    title?: string;
    description?: string;
    shortDescription?: string;
    category?: string;
    status?: string;
    fundingGoal?: string;
    imageUrl?: string;
  }, adminWallet: string) {
    const [project] = await db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    
    // Log the action
    await this.logAdminAction({
      adminWallet,
      actionType: 'edit_project',
      targetType: 'project',
      targetId: id,
      metadata: data
    });
    
    return project;
  },

  async deleteProject(id: string, adminWallet: string, reason?: string) {
    const [project] = await db
      .update(projects)
      .set({
        deletedAt: new Date(),
        deletedBy: adminWallet,
        deleteReason: reason
      })
      .where(eq(projects.id, id))
      .returning();
    
    // Log the action
    await this.logAdminAction({
      adminWallet,
      actionType: 'delete_project',
      targetType: 'project',
      targetId: id,
      reason,
      metadata: { title: project?.title }
    });
    
    return project;
  },

  async getAdminDashboardStats() {
    const [totalProposals] = await db.select({ count: count() }).from(proposals).where(isNull(proposals.deletedAt));
    const [totalProjects] = await db.select({ count: count() }).from(projects).where(isNull(projects.deletedAt));
    const [pendingProposals] = await db.select({ count: count() }).from(proposals).where(and(eq(proposals.status, 'pending'), isNull(proposals.deletedAt)));
    const [pendingSubmissions] = await db.select({ count: count() }).from(projectSubmissions).where(eq(projectSubmissions.status, 'submitted'));
    const [recentActions] = await db.select({ count: count() }).from(adminActions).where(sql`${adminActions.createdAt} > NOW() - INTERVAL '24 hours'`);
    
    return {
      totalProposals: totalProposals.count,
      totalProjects: totalProjects.count,
      pendingProposals: pendingProposals.count,
      pendingSubmissions: pendingSubmissions.count,
      recentActions: recentActions.count
    };
  }
};

// Partner services
export const partnerService = {
  async getAllPartners() {
    return await db
      .select()
      .from(partners)
      .where(and(eq(partners.status, 'active'), isNull(partners.deletedAt)))
      .orderBy(desc(partners.createdAt));
  },

  async getPartnerById(id: string) {
    const [partner] = await db
      .select()
      .from(partners)
      .where(and(eq(partners.id, id), isNull(partners.deletedAt)));
    return partner;
  },

  async getPartnersByType(partnerType: string) {
    return await db
      .select()
      .from(partners)
      .where(and(
        eq(partners.partnerType, partnerType), 
        eq(partners.status, 'active'),
        isNull(partners.deletedAt)
      ))
      .orderBy(desc(partners.createdAt));
  },

  async createPartner(data: typeof partners.$inferInsert) {
    const [partner] = await db.insert(partners).values({
      ...data,
      updatedAt: new Date()
    }).returning();
    return partner;
  },

  async updatePartner(id: string, data: Partial<typeof partners.$inferInsert>) {
    const [partner] = await db
      .update(partners)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(partners.id, id))
      .returning();
    return partner;
  },

  async deletePartner(id: string, deletedBy: string, reason: string) {
    const [partner] = await db
      .update(partners)
      .set({ 
        deletedAt: new Date(),
        deletedBy,
        deleteReason: reason,
        updatedAt: new Date()
      })
      .where(eq(partners.id, id))
      .returning();
    return partner;
  },

  // Partner Applications
  async submitPartnerApplication(data: typeof partnerApplications.$inferInsert) {
    const [application] = await db.insert(partnerApplications).values({
      ...data,
      updatedAt: new Date()
    }).returning();
    return application;
  },

  async getAllPartnerApplications(status?: string) {
    const conditions = status ? [eq(partnerApplications.status, status)] : [];
    
    return await db
      .select()
      .from(partnerApplications)
      .where(and(...conditions))
      .orderBy(desc(partnerApplications.createdAt));
  },

  async getPartnerApplicationById(id: string) {
    const [application] = await db
      .select()
      .from(partnerApplications)
      .where(eq(partnerApplications.id, id));
    return application;
  },

  async reviewPartnerApplication(id: string, status: 'approved' | 'rejected', reviewedBy: string, reviewNotes?: string) {
    const [application] = await db
      .update(partnerApplications)
      .set({
        status,
        reviewedBy,
        reviewedAt: new Date(),
        reviewNotes,
        updatedAt: new Date()
      })
      .where(eq(partnerApplications.id, id))
      .returning();
    return application;
  },

  async getPartnerStats() {
    const [totalPartners] = await db.select({ count: count() }).from(partners).where(and(eq(partners.status, 'active'), isNull(partners.deletedAt)));
    const [pendingApplications] = await db.select({ count: count() }).from(partnerApplications).where(eq(partnerApplications.status, 'pending'));
    
    const partnerTypes = await db
      .select({
        type: partners.partnerType,
        count: count()
      })
      .from(partners)
      .where(and(eq(partners.status, 'active'), isNull(partners.deletedAt)))
      .groupBy(partners.partnerType);
    
    return {
      totalPartners: totalPartners.count,
      pendingApplications: pendingApplications.count,
      partnerTypes
    };
  }
};
