/**
 * Security Seed Script (JSON Database Version)
 * Populates the JSON database with initial security classification groups and users
 *
 * Run with: node src/utils/seedSecurityJSON.js
 */

const { getCollection } = require('./jsonDB');

/**
 * Security Classification Groups
 * Maps ADFS group names to security levels (1-5)
 */
const classificationGroups = [
  {
    adfsGroupName: 'Portal_Users',
    level: 1,
    description: 'Basic portal users - can view public content',
    isActive: true,
  },
  {
    adfsGroupName: 'Portal_Employees',
    level: 2,
    description: 'Regular employees - can view internal content',
    isActive: true,
  },
  {
    adfsGroupName: 'Portal_Managers',
    level: 3,
    description: 'Department managers - can view sensitive content',
    isActive: true,
  },
  {
    adfsGroupName: 'Portal_Executives',
    level: 4,
    description: 'Senior executives - can view confidential content',
    isActive: true,
  },
  {
    adfsGroupName: 'Portal_TopSecret',
    level: 5,
    description: 'Top security clearance - can view all classified content',
    isActive: true,
  },
];

/**
 * Mock Users
 * One user for each security level for testing
 */
const users = [
  {
    username: 'user.basic',
    fullName: 'משתמש בסיסי',
    email: 'user.basic@organization.com',
    adfsGroups: ['Portal_Users'],
    role: 'viewer',
    isActive: true,
  },
  {
    username: 'employee.regular',
    fullName: 'עובד רגיל',
    email: 'employee@organization.com',
    adfsGroups: ['Portal_Users', 'Portal_Employees'],
    role: 'viewer',
    isActive: true,
  },
  {
    username: 'manager.department',
    fullName: 'מנהל מחלקה',
    email: 'manager@organization.com',
    adfsGroups: ['Portal_Users', 'Portal_Employees', 'Portal_Managers'],
    role: 'editor',
    isActive: true,
  },
  {
    username: 'executive.senior',
    fullName: 'מנכ"ל בכיר',
    email: 'executive@organization.com',
    adfsGroups: [
      'Portal_Users',
      'Portal_Employees',
      'Portal_Managers',
      'Portal_Executives',
    ],
    role: 'editor',
    isActive: true,
  },
  {
    username: 'admin.security',
    fullName: 'מנהל אבטחה',
    email: 'admin@organization.com',
    adfsGroups: [
      'Portal_Users',
      'Portal_Employees',
      'Portal_Managers',
      'Portal_Executives',
      'Portal_TopSecret',
    ],
    role: 'admin',
    isActive: true,
  },
];

/**
 * Calculate user's security level based on ADFS groups
 */
const calculateUserSecurityLevel = (user, groups) => {
  if (!user.adfsGroups || user.adfsGroups.length === 0) {
    return 1;
  }

  const userGroupLevels = groups
    .filter((g) => user.adfsGroups.includes(g.adfsGroupName))
    .map((g) => g.level);

  if (userGroupLevels.length === 0) {
    return 1;
  }

  return Math.max(...userGroupLevels);
};

/**
 * Seed Classification Groups
 */
const seedClassificationGroups = () => {
  try {
    const groupsDB = getCollection('classificationGroups');

    // Clear existing groups
    groupsDB.clearAll();
    console.log('🗑️  Cleared existing classification groups');

    // Insert new groups
    const createdGroups = groupsDB.insertMany(classificationGroups);
    console.log(`✅ Created ${createdGroups.length} classification groups:`);

    createdGroups.forEach((group) => {
      console.log(
        `   - ${group.adfsGroupName.padEnd(25)} | Level ${group.level} | ${group.description}`
      );
    });

    return createdGroups;
  } catch (error) {
    console.error('❌ Error seeding classification groups:', error.message);
    throw error;
  }
};

/**
 * Seed Users
 */
const seedUsers = (groups) => {
  try {
    const usersDB = getCollection('users');

    // Clear existing users
    usersDB.clearAll();
    console.log('🗑️  Cleared existing users');

    // Insert new users
    const createdUsers = usersDB.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} mock users:`);

    // Calculate and display security levels
    createdUsers.forEach((user) => {
      const securityLevel = calculateUserSecurityLevel(user, groups);
      console.log(
        `   - ${user.username.padEnd(20)} | ${user.fullName.padEnd(15)} | Role: ${user.role.padEnd(7)} | Level: ${securityLevel}`
      );
    });

    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    throw error;
  }
};

/**
 * Main seed function
 */
const seedSecurity = () => {
  try {
    console.log('\n========================================');
    console.log('🔐 Security Seed Script (JSON Database)');
    console.log('========================================\n');

    // Seed classification groups
    console.log('📚 Seeding Classification Groups...\n');
    const groups = seedClassificationGroups();

    // Seed users
    console.log('\n👥 Seeding Users...\n');
    seedUsers(groups);

    console.log('\n========================================');
    console.log('✅ Security seeding completed successfully!');
    console.log('========================================\n');

    console.log('📌 Test Users Created:');
    console.log('   1. user.basic       - Security Level 1 (Basic User)');
    console.log('   2. employee.regular - Security Level 2 (Employee)');
    console.log('   3. manager.department - Security Level 3 (Manager)');
    console.log('   4. executive.senior - Security Level 4 (Executive)');
    console.log('   5. admin.security   - Security Level 5 (Top Secret)');
    console.log('\n💡 Usage:');
    console.log('   Send requests with header: x-user-id: <username>');
    console.log('   Example: x-user-id: manager.department\n');

    console.log('📁 Data stored in:');
    console.log('   - backend/data/classificationGroups.json');
    console.log('   - backend/data/users.json\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

// Run the seed script
if (require.main === module) {
  seedSecurity();
}

module.exports = { seedSecurity, seedClassificationGroups, seedUsers };
