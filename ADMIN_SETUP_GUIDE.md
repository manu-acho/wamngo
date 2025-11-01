# Admin Setup and Access Guide

## Overview
The WAM platform includes a comprehensive admin system for managing proposals, projects, users, and platform settings. This guide covers how to set up admin access and use the admin features.

## Admin System Features

### Core Functionality
- **Proposal Management**: Create, edit, delete, and manage all proposals
- **Project Management**: Oversee project status, funding, and milestones
- **User Management**: Assign admin roles and permissions
- **Audit Logging**: Track all admin actions with timestamps and details
- **Soft Deletes**: Safe deletion with recovery options
- **Role-Based Access**: Multiple admin permission levels

### Admin Dashboard Features
- Platform statistics and analytics
- Recent admin actions log
- Quick access to management functions
- Real-time data overview

## Setting Up Admin Access

### 1. Database Setup
Ensure your database includes the admin tables by running the migration:

```bash
npm run db:generate
npm run db:migrate
```

### 2. Creating the First Admin User

#### Option A: Direct Database Insert
Connect to your database and run:

```sql
-- Replace 'YOUR_WALLET_ADDRESS' with the actual wallet address
INSERT INTO admin_roles (wallet_address, role, permissions, created_at, updated_at)
VALUES (
  'YOUR_WALLET_ADDRESS',
  'super_admin',
  '["all"]',
  NOW(),
  NOW()
);
```

#### Option B: Using the Admin API (requires authentication)
```bash
curl -X POST http://localhost:3000/api/admin/roles \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_WALLET_ADDRESS",
    "role": "super_admin",
    "permissions": ["all"]
  }'
```

### 3. Admin Role Types

- **super_admin**: Full access to all admin functions
- **admin**: Standard admin access (manage proposals/projects)
- **moderator**: Limited access (view-only + basic moderation)

### 4. Permission System

Permissions are stored as JSON arrays and can include:
- `"all"` - Full access to everything
- `"proposals"` - Manage proposals
- `"projects"` - Manage projects  
- `"users"` - Manage user roles
- `"audit"` - View audit logs
- `"analytics"` - View platform analytics

## Accessing Admin Features

### 1. Connect Your Wallet
- Navigate to the WAM platform
- Connect the wallet address that has admin privileges
- The system will automatically detect admin status

### 2. Admin Navigation
Once authenticated as an admin, you'll see:
- **Admin** menu item in the main navigation (shield icon)
- Available in both desktop and mobile navigation
- Only visible to users with admin roles

### 3. Admin Dashboard
Access the admin dashboard at `/admin` or through the navigation menu:
- Overview of platform statistics
- Recent admin actions
- Quick management links
- Real-time data updates

## Admin Functions

### Proposal Management
- **View All Proposals**: Including drafts and deleted items
- **Edit Proposals**: Modify title, description, funding goals
- **Delete/Restore**: Soft delete with recovery options
- **Status Management**: Update proposal lifecycle stages

### Project Management
- **Project Oversight**: Monitor all funded projects
- **Milestone Tracking**: Update project progress
- **Fund Management**: Track funding distribution

### User Management
- **Role Assignment**: Grant/revoke admin privileges
- **Permission Management**: Fine-tune access levels
- **User Activity**: Monitor user engagement

### Audit Trail
- **Action Logging**: All admin actions are automatically logged
- **Search/Filter**: Find specific actions by date, user, or type
- **Export**: Download audit logs for compliance

## Security Considerations

### Authentication
- Admin access is tied to wallet addresses
- No password-based authentication
- Session management through wallet connection

### Authorization
- Role-based permission checking on all admin routes
- API endpoints protected with admin middleware
- Frontend components hide based on user permissions

### Audit Trail
- All admin actions are logged with:
  - Timestamp
  - Admin wallet address
  - Action type and details
  - Affected resources

## API Endpoints

### Admin Dashboard
- `GET /api/admin/dashboard` - Admin dashboard data

### Proposal Management
- `GET /api/admin/proposals` - List all proposals
- `PUT /api/admin/proposals/[id]` - Update proposal
- `DELETE /api/admin/proposals/[id]` - Soft delete proposal

### Project Management
- `GET /api/admin/projects` - List all projects
- `PUT /api/admin/projects/[id]` - Update project

### Role Management
- `GET /api/admin/roles` - List admin roles
- `POST /api/admin/roles` - Create admin role
- `DELETE /api/admin/roles/[id]` - Remove admin role

### Audit Log
- `GET /api/admin/audit` - View audit trail

## Troubleshooting

### Admin Menu Not Visible
1. Verify wallet is connected
2. Check wallet address has admin role in database
3. Ensure admin role has appropriate permissions
4. Clear browser cache and reconnect wallet

### Access Denied Errors
1. Confirm admin role exists for wallet address
2. Verify permissions include required access level
3. Check API endpoints are returning 200 status

### Database Issues
1. Ensure admin tables exist (run migrations)
2. Verify database connection in admin services
3. Check database user has required permissions

## Development Notes

### Adding New Admin Features
1. Add API route in `/src/app/api/admin/`
2. Include admin authentication middleware
3. Add audit logging for actions
4. Update UI components with permission checks

### Testing Admin Functions
1. Create test admin user in development database
2. Test all admin flows with different permission levels
3. Verify audit logging captures all actions
4. Test role-based UI hiding/showing

## Support

For technical issues with the admin system:
1. Check the audit log for error details
2. Verify database schema is up to date
3. Review admin service logs
4. Test API endpoints directly

---

**Important**: Always test admin functionality in a development environment before deploying to production. Admin privileges provide significant platform control and should be granted carefully.
