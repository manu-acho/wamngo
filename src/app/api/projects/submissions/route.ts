import { NextRequest, NextResponse } from 'next/server';
import { projectService, analyticsService } from '@/lib/db/services';

export async function GET() {
  try {
    const submissions = await projectService.getProjectSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching project submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      shortDescription,
      category,
      fundingGoal,
      tokenAllocation,
      technologyStack,
      targetBeneficiaries,
      expectedImpact,
      timeline,
      teamMembers,
      submittedBy
    } = body;

    // Validate required fields
    if (!title || !description || !category || !fundingGoal || !submittedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const submission = await projectService.createProjectSubmission({
      title,
      description,
      shortDescription,
      category,
      fundingGoal,
      tokenAllocation,
      technologyStack,
      targetBeneficiaries,
      expectedImpact,
      timeline,
      teamMembers,
      submittedBy
    });

    // Record user action
    await analyticsService.recordUserAction({
      walletAddress: submittedBy,
      actionType: 'project_submitted',
      targetId: submission.id,
      metadata: { title, category, fundingGoal }
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating project submission:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
