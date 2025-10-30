import { NextRequest, NextResponse } from 'next/server';
import { communicationService, analyticsService } from '@/lib/db/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const submission = await communicationService.createContactSubmission({
      name,
      email,
      subject,
      message
    });

    // Record action for analytics
    await analyticsService.recordUserAction({
      actionType: 'contact_form_submitted',
      targetId: submission.id,
      metadata: { subject, email }
    });

    return NextResponse.json(
      { message: 'Contact submission successful', id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
