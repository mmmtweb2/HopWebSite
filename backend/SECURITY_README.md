# Security System - RBAC & Classification Layer

This document explains the Role-Based Access Control (RBAC) and Classification Security Layer implemented for the organization portal backend.

## Overview

The security system provides:
- **Classification Groups**: Maps ADFS group names to security levels (1-5)
- **User Management**: Stores users with ADFS groups and RBAC roles
- **Security Middleware**: Calculates and enforces security clearance levels
- **JSON Database**: File-based storage (no MongoDB required)

## Architecture

### Security Levels (1-5)
- **Level 1**: Basic portal users - public content
- **Level 2**: Regular employees - internal content
- **Level 3**: Department managers - sensitive content
- **Level 4**: Senior executives - confidential content
- **Level 5**: Top security clearance - all classified content

### User Roles (RBAC)
- **viewer**: Can only view resources
- **editor**: Can view and edit resources
- **admin**: Full access to manage all resources

## File Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── User.js                    # Mongoose User model (for MongoDB)
│   │   ├── ClassificationGroup.js     # Mongoose Classification model
│   │   ├── App.js                     # Updated with minSecurityLevel
│   │   └── FileResource.js            # Updated with minSecurityLevel
│   │
│   ├── middleware/
│   │   ├── securityMiddleware.js      # Security middleware (MongoDB version)
│   │   └── securityMiddlewareJSON.js  # Security middleware (JSON DB version) ✅
│   │
│   └── utils/
│       ├── jsonDB.js                  # JSON database utility ✅
│       ├── jsonModels.js              # Mongoose-like interface for JSON DB ✅
│       ├── seedSecurity.js            # Seed script (MongoDB version)
│       ├── seedSecurityJSON.js        # Seed script (JSON DB version) ✅
│       └── testSecurity.js            # Test script ✅
│
└── data/                              # JSON database files (auto-created)
    ├── users.json
    ├── classificationGroups.json
    ├── apps.json
    └── fileResources.json
```

## Getting Started

### 1. Seed the Database

```bash
# Seed initial security data (5 groups + 5 test users)
cd backend
node src/utils/seedSecurityJSON.js
```

This creates:
- 5 Classification Groups (Portal_Users, Portal_Employees, Portal_Managers, Portal_Executives, Portal_TopSecret)
- 5 Test Users with different security levels

### 2. Test the System

```bash
# Run comprehensive tests
node src/utils/testSecurity.js
```

### 3. Use in Your Routes

#### Option A: Apply to All Routes (Global)

```javascript
// server.js or app.js
const { calculateSecurityLevel } = require('./middleware/securityMiddlewareJSON');

// Apply to all routes
app.use(calculateSecurityLevel);

// Now req.userSecurityLevel is available in all routes
app.get('/api/apps', (req, res) => {
  const userLevel = req.userSecurityLevel;
  // Filter apps based on userLevel
});
```

#### Option B: Apply to Specific Routes

```javascript
const { calculateSecurityLevel, requireSecurityLevel } = require('./middleware/securityMiddlewareJSON');

// Calculate security level for this route
app.get('/api/apps',
  calculateSecurityLevel,
  (req, res) => {
    const userLevel = req.userSecurityLevel;
    // Your logic here
  }
);

// Require minimum security level
app.get('/api/classified',
  calculateSecurityLevel,
  requireSecurityLevel(3), // Require level 3 or higher
  (req, res) => {
    // Only users with level 3+ can access this
  }
);
```

#### Option C: Filter Resources in Controllers

```javascript
const { calculateSecurityLevel, filterBySecurityLevel } = require('./middleware/securityMiddlewareJSON');
const { App } = require('../utils/jsonModels');

app.get('/api/apps', calculateSecurityLevel, async (req, res) => {
  try {
    // Get all apps
    const allApps = await App.find({ isActive: true });

    // Filter by user's security level
    const userLevel = req.userSecurityLevel;
    const accessibleApps = filterBySecurityLevel(allApps, userLevel);

    res.json({
      success: true,
      data: accessibleApps,
      userLevel: userLevel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

#### Option D: Check Single Resource Access

```javascript
const { calculateSecurityLevel, checkResourceAccess } = require('./middleware/securityMiddlewareJSON');

// Check if user can access specific app
app.get('/api/apps/:id',
  calculateSecurityLevel,
  checkResourceAccess('App'), // Checks minSecurityLevel
  (req, res) => {
    // req.resource contains the app if user has access
    res.json({
      success: true,
      data: req.resource
    });
  }
);
```

## API Usage Examples

### Sending Requests with User Identity

Include the username in the `x-user-id` header:

```bash
# Level 1 user (basic)
curl -H "x-user-id: user.basic" http://localhost:5000/api/apps

# Level 3 user (manager)
curl -H "x-user-id: manager.department" http://localhost:5000/api/apps

# Level 5 user (admin)
curl -H "x-user-id: admin.security" http://localhost:5000/api/apps
```

### Test Users Available

| Username | Full Name | Role | Security Level | ADFS Groups |
|----------|-----------|------|----------------|-------------|
| `user.basic` | משתמש בסיסי | viewer | 1 | Portal_Users |
| `employee.regular` | עובד רגיל | viewer | 2 | Portal_Users, Portal_Employees |
| `manager.department` | מנהל מחלקה | editor | 3 | Portal_Users, Portal_Employees, Portal_Managers |
| `executive.senior` | מנכ"ל בכיר | editor | 4 | Portal_Users, Portal_Employees, Portal_Managers, Portal_Executives |
| `admin.security` | מנהל אבטחה | admin | 5 | All groups |

## Adding Security to Resources

### Apps

```javascript
const { App } = require('./utils/jsonModels');

// Create app with security level
const app = await App.create({
  title: 'Classified Dashboard',
  description: 'Only for managers and above',
  minSecurityLevel: 3, // Requires level 3+
  icon: 'Shield',
  category: 'analytics'
});
```

### File Resources

```javascript
const { FileResource } = require('./utils/jsonModels');

// Create file with security level
const file = await FileResource.create({
  title: 'Confidential Report Q4',
  description: 'Executive-only financial data',
  fileName: 'report-q4-2024.pdf',
  fileSize: 1024000,
  mimeType: 'application/pdf',
  filePath: '/uploads/report-q4-2024.pdf',
  sectionCategory: 'extended-knowledge',
  minSecurityLevel: 4 // Requires level 4+
});
```

## Security Middleware Details

### `calculateSecurityLevel(req, res, next)`
- Extracts userId from headers (`x-user-id`), body, or query
- Finds user in database
- Calculates max security level from user's ADFS groups
- Attaches to request: `req.userSecurityLevel`, `req.user`, `req.userRole`
- Defaults to level 1 if user not found

### `requireSecurityLevel(minLevel)`
- Middleware factory that enforces minimum level
- Returns 403 if user's level is below required
- Example: `requireSecurityLevel(3)` blocks levels 1-2

### `filterBySecurityLevel(resources, userLevel)`
- Filters array of resources
- Only returns items where `minSecurityLevel <= userLevel`
- Use in controllers to filter query results

### `checkResourceAccess(modelName)`
- Middleware factory for single resource access
- Checks if user can access specific resource by ID
- Returns 403 if insufficient clearance
- Attaches resource to `req.resource` if authorized

## JSON Database API

### User Operations

```javascript
const { User } = require('./utils/jsonModels');

// Find by username
const user = await User.findByUsername('manager.department');

// Find by ID
const user = await User.findById('mjgzi5zfx1m70mt9f7p');

// Calculate security level
const level = await User.calculateSecurityLevel(user);

// Get role in Hebrew
const roleHebrew = User.getRoleHebrew(user.role);

// Find all
const allUsers = await User.find();

// Find with query
const editors = await User.find({ role: 'editor' });
```

### Classification Group Operations

```javascript
const { ClassificationGroup } = require('./utils/jsonModels');

// Find by ADFS name
const group = await ClassificationGroup.findByAdfsName('Portal_Managers');

// Get max level from groups
const maxLevel = await ClassificationGroup.getMaxLevelFromGroups([
  'Portal_Users',
  'Portal_Managers'
]); // Returns 3
```

### App Operations

```javascript
const { App } = require('./utils/jsonModels');

// Create app
const app = await App.create({
  title: 'Analytics Dashboard',
  minSecurityLevel: 2
});

// Find apps
const publicApps = await App.find({ minSecurityLevel: 1 });

// Update app
await App.updateById(appId, { minSecurityLevel: 3 });

// Delete app (soft delete)
await App.deleteById(appId);
```

## Migration from MongoDB

If you later want to use MongoDB instead of JSON files:

1. Change imports in your routes:
```javascript
// FROM:
const { User } = require('./utils/jsonModels');
const { calculateSecurityLevel } = require('./middleware/securityMiddlewareJSON');

// TO:
const User = require('./models/User');
const { calculateSecurityLevel } = require('./middleware/securityMiddleware');
```

2. Run MongoDB seed script:
```bash
node src/utils/seedSecurity.js
```

The API remains the same!

## Production Considerations

### Current Implementation (Development)
- User ID sent in header (`x-user-id`)
- No real authentication
- ADFS groups hardcoded in database

### Production Implementation
1. **Replace mock auth with real ADFS/OAuth**:
   ```javascript
   // Instead of: req.headers['x-user-id']
   // Use JWT/session: req.user (from passport/ADFS middleware)
   ```

2. **Get ADFS groups from real claims**:
   ```javascript
   // ADFS will provide groups in JWT token claims
   const adfsGroups = req.user.groups; // From SAML/OAuth token
   ```

3. **Add rate limiting and security headers**

4. **Log security events**:
   ```javascript
   console.log(`Access denied: User ${userId} tried to access Level ${required} resource`);
   ```

## Troubleshooting

### User not found
- Check username spelling (case-insensitive)
- Verify data seeded: `cat backend/data/users.json`

### Security level always 1
- Check user has ADFS groups: `user.adfsGroups`
- Verify classification groups exist: `cat backend/data/classificationGroups.json`

### Can't access resources
- Check resource's `minSecurityLevel`
- Check user's calculated security level
- Use test script: `node src/utils/testSecurity.js`

## Support

For issues or questions about the security system, check:
1. Test script output: `node src/utils/testSecurity.js`
2. Seed script logs: `node src/utils/seedSecurityJSON.js`
3. JSON files in `backend/data/`
