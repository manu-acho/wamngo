// Email service for handling partnership-related notifications
// This is a placeholder implementation that logs emails instead of sending them
// In production, integrate with your preferred email service (SendGrid, AWS SES, etc.)

interface EmailTemplate {
  'partnership-application-received': {
    organizationName: string;
    contactName: string;
    applicationId: string;
  };
  'partnership-approved': {
    organizationName: string;
    contactName: string;
    feedback?: string;
    partnerPortalUrl: string;
  };
  'partnership-rejected': {
    organizationName: string;
    contactName: string;
    feedback?: string;
    reapplyUrl: string;
  };
  'partnership-info-request': {
    organizationName: string;
    contactName: string;
    feedback: string;
    updateUrl: string;
  };
  'admin-new-application': {
    organizationName: string;
    partnerType: string;
    applicationId: string;
    adminPanelUrl: string;
  };
}

interface EmailData<T extends keyof EmailTemplate> {
  to: string;
  subject: string;
  template: T;
  data: EmailTemplate[T];
}

export async function sendEmail<T extends keyof EmailTemplate>(
  emailData: EmailData<T>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // In production, replace this with actual email service integration
    console.log('📧 Email would be sent:', {
      to: emailData.to,
      subject: emailData.subject,
      template: emailData.template,
      data: emailData.data
    });

    // Simulate email templates
    const emailContent = generateEmailContent(emailData.template, emailData.data);
    
    console.log('📧 Email content:');
    console.log('Subject:', emailData.subject);
    console.log('To:', emailData.to);
    console.log('Content:', emailContent);

    // TODO: Integrate with actual email service
    // Example integrations:
    
    // SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: emailData.to,
    //   from: process.env.FROM_EMAIL,
    //   subject: emailData.subject,
    //   html: emailContent,
    // };
    // await sgMail.send(msg);

    // AWS SES:
    // const sesClient = new SESClient({ region: process.env.AWS_REGION });
    // const command = new SendEmailCommand({
    //   Source: process.env.FROM_EMAIL,
    //   Destination: { ToAddresses: [emailData.to] },
    //   Message: {
    //     Subject: { Data: emailData.subject },
    //     Body: { Html: { Data: emailContent } }
    //   }
    // });
    // await sesClient.send(command);

    // Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.FROM_EMAIL,
    //   to: emailData.to,
    //   subject: emailData.subject,
    //   html: emailContent,
    // });

    return {
      success: true,
      messageId: `placeholder-${Date.now()}`
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function generateEmailContent<T extends keyof EmailTemplate>(
  template: T,
  data: EmailTemplate[T]
): string {
  const baseStyles = `
    <style>
      .email-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      .header {
        background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
        color: white;
        padding: 30px 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 30px 20px;
        border: 1px solid #e5e7eb;
        border-top: none;
        border-radius: 0 0 8px 8px;
      }
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 14px;
        margin-top: 30px;
      }
    </style>
  `;

  switch (template) {
    case 'partnership-application-received':
      const appData = data as EmailTemplate['partnership-application-received'];
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <h1>Application Received</h1>
          </div>
          <div class="content">
            <h2>Thank you for your partnership application!</h2>
            <p>Dear ${appData.contactName},</p>
            <p>We have received your partnership application for <strong>${appData.organizationName}</strong>.</p>
            <p>Our team will review your application and get back to you within 5-7 business days.</p>
            <p><strong>Application ID:</strong> ${appData.applicationId}</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The WAM Partnership Team</p>
          </div>
        </div>
      `;

    case 'partnership-approved':
      const approvedData = data as EmailTemplate['partnership-approved'];
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <h1>Partnership Approved! 🎉</h1>
          </div>
          <div class="content">
            <h2>Welcome to the WAM Partner Network!</h2>
            <p>Dear ${approvedData.contactName},</p>
            <p>Congratulations! We're excited to inform you that <strong>${approvedData.organizationName}</strong> has been approved as a WAM partner.</p>
            ${approvedData.feedback ? `<p><strong>Review Feedback:</strong> ${approvedData.feedback}</p>` : ''}
            <p>Next steps:</p>
            <ul>
              <li>Access your partner portal using the link below</li>
              <li>Complete your partner profile</li>
              <li>Schedule an onboarding call with our team</li>
            </ul>
            <a href="${approvedData.partnerPortalUrl}" class="button">Access Partner Portal</a>
          </div>
          <div class="footer">
            <p>Welcome to the team!<br>The WAM Partnership Team</p>
          </div>
        </div>
      `;

    case 'partnership-rejected':
      const rejectedData = data as EmailTemplate['partnership-rejected'];
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <h1>Partnership Application Update</h1>
          </div>
          <div class="content">
            <h2>Thank you for your interest</h2>
            <p>Dear ${rejectedData.contactName},</p>
            <p>Thank you for submitting a partnership application for <strong>${rejectedData.organizationName}</strong>.</p>
            <p>After careful review, we're unable to move forward with this partnership at this time.</p>
            ${rejectedData.feedback ? `<p><strong>Feedback:</strong> ${rejectedData.feedback}</p>` : ''}
            <p>We encourage you to consider reapplying in the future as your organization grows and our partnership needs evolve.</p>
            <a href="${rejectedData.reapplyUrl}" class="button">Learn About Future Opportunities</a>
          </div>
          <div class="footer">
            <p>Thank you for your understanding,<br>The WAM Partnership Team</p>
          </div>
        </div>
      `;

    case 'partnership-info-request':
      const infoData = data as EmailTemplate['partnership-info-request'];
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <h1>Additional Information Needed</h1>
          </div>
          <div class="content">
            <h2>Partnership Application Update</h2>
            <p>Dear ${infoData.contactName},</p>
            <p>Thank you for your partnership application for <strong>${infoData.organizationName}</strong>.</p>
            <p>To continue processing your application, we need some additional information:</p>
            <p><strong>Requested Information:</strong></p>
            <p>${infoData.feedback}</p>
            <p>Please provide this information at your earliest convenience.</p>
            <a href="${infoData.updateUrl}" class="button">Update Application</a>
          </div>
          <div class="footer">
            <p>Thank you for your cooperation,<br>The WAM Partnership Team</p>
          </div>
        </div>
      `;

    case 'admin-new-application':
      const adminData = data as EmailTemplate['admin-new-application'];
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <h1>New Partnership Application</h1>
          </div>
          <div class="content">
            <h2>New application received</h2>
            <p>A new partnership application has been submitted:</p>
            <p><strong>Organization:</strong> ${adminData.organizationName}</p>
            <p><strong>Type:</strong> ${adminData.partnerType}</p>
            <p><strong>Application ID:</strong> ${adminData.applicationId}</p>
            <a href="${adminData.adminPanelUrl}" class="button">Review Application</a>
          </div>
          <div class="footer">
            <p>WAM Admin System</p>
          </div>
        </div>
      `;

    default:
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="content">
            <p>Email template not found for: ${template}</p>
          </div>
        </div>
      `;
  }
}

// Helper function to send admin notification emails
export async function notifyAdminsOfNewApplication(applicationData: {
  id: string;
  organizationName: string;
  partnerType: string;
}) {
  // In production, get admin emails from database or environment variables
  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS?.split(',') || ['admin@wam.com'];

  const results = await Promise.all(
    adminEmails.map(email => 
      sendEmail({
        to: email.trim(),
        subject: `New Partnership Application: ${applicationData.organizationName}`,
        template: 'admin-new-application',
        data: {
          organizationName: applicationData.organizationName,
          partnerType: applicationData.partnerType,
          applicationId: applicationData.id,
          adminPanelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/partners/applications`
        }
      })
    )
  );

  return results;
}
