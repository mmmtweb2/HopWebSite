/**
 * Security Seed Script
 * Populates the database with initial security classification groups and users
 *
 * Run with: node src/utils/seedSecurity.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const ClassificationGroup = require('../models/ClassificationGroup');
const User = require('../models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

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
 * Seed Classification Groups
 */
const seedClassificationGroups = async () => {
  try {
    // Clear existing groups
    await ClassificationGroup.deleteMany({});
    console.log('🗑️  Cleared existing classification groups');

    // Insert new groups
    const createdGroups = await ClassificationGroup.insertMany(classificationGroups);
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
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Insert new users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} mock users:`);

    // Calculate and display security levels
    for (const user of createdUsers) {
      const securityLevel = await user.calculateSecurityLevel();
      console.log(
        `   - ${user.username.padEnd(20)} | ${user.fullName.padEnd(15)} | Role: ${user.role.padEnd(7)} | Level: ${securityLevel}`
      );
    }

    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    throw error;
  }
};

/**
 * Main seed function
 */
const seedSecurity = async () => {
  try {
    console.log('\n========================================');
    console.log('🔐 Security Seed Script');
    console.log('========================================\n');

    // Connect to database
    await connectDB();

    // Seed classification groups
    console.log('\n📚 Seeding Classification Groups...\n');
    await seedClassificationGroups();

    // Seed users
    console.log('\n👥 Seeding Users...\n');
    await seedUsers();

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

    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed script
if (require.main === module) {
  seedSecurity();
}

module.exports = { seedSecurity, seedClassificationGroups, seedUsers };
