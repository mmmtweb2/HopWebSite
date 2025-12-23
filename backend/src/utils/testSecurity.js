/**
 * Test Security System
 * Demonstrates how the JSON-based security system works
 *
 * Run with: node src/utils/testSecurity.js
 */

const { User, ClassificationGroup } = require('./jsonModels');
const { filterBySecurityLevel } = require('../middleware/securityMiddlewareJSON');

/**
 * Test user security levels
 */
const testUserSecurityLevels = async () => {
  console.log('\n========================================');
  console.log('🔐 Testing User Security Levels');
  console.log('========================================\n');

  const users = await User.find();

  for (const user of users) {
    const securityLevel = await User.calculateSecurityLevel(user);
    const roleHebrew = User.getRoleHebrew(user.role);

    console.log(`👤 ${user.fullName} (${user.username})`);
    console.log(`   Role: ${roleHebrew} (${user.role})`);
    console.log(`   ADFS Groups: ${user.adfsGroups.join(', ')}`);
    console.log(`   🔒 Security Level: ${securityLevel}`);
    console.log('');
  }
};

/**
 * Test resource filtering by security level
 */
const testResourceFiltering = async () => {
  console.log('========================================');
  console.log('📄 Testing Resource Filtering');
  console.log('========================================\n');

  // Mock resources with different security levels
  const mockApps = [
    { title: 'Public Dashboard', minSecurityLevel: 1 },
    { title: 'Employee Portal', minSecurityLevel: 2 },
    { title: 'Manager Tools', minSecurityLevel: 3 },
    { title: 'Executive Reports', minSecurityLevel: 4 },
    { title: 'Classified Documents', minSecurityLevel: 5 },
  ];

  const testUsers = [
    { username: 'user.basic', expectedLevel: 1 },
    { username: 'employee.regular', expectedLevel: 2 },
    { username: 'manager.department', expectedLevel: 3 },
    { username: 'executive.senior', expectedLevel: 4 },
    { username: 'admin.security', expectedLevel: 5 },
  ];

  for (const testUser of testUsers) {
    const user = await User.findByUsername(testUser.username);
    if (!user) continue;

    const securityLevel = await User.calculateSecurityLevel(user);
    const accessibleApps = filterBySecurityLevel(mockApps, securityLevel);

    console.log(`👤 ${user.fullName} (Level ${securityLevel}):`);
    console.log(`   Can access ${accessibleApps.length}/${mockApps.length} apps:`);
    accessibleApps.forEach((app) => {
      console.log(`   ✅ ${app.title} (Level ${app.minSecurityLevel})`);
    });
    console.log('');
  }
};

/**
 * Test classification groups
 */
const testClassificationGroups = async () => {
  console.log('========================================');
  console.log('📚 Testing Classification Groups');
  console.log('========================================\n');

  const groups = await ClassificationGroup.find();

  console.log(`Total Groups: ${groups.length}\n`);

  groups.forEach((group) => {
    console.log(`🔐 ${group.adfsGroupName}`);
    console.log(`   Level: ${group.level}`);
    console.log(`   Description: ${group.description}`);
    console.log('');
  });
};

/**
 * Test security level calculation
 */
const testSecurityCalculation = async () => {
  console.log('========================================');
  console.log('🧮 Testing Security Level Calculation');
  console.log('========================================\n');

  // Test cases
  const testCases = [
    {
      name: 'No groups',
      groups: [],
      expectedLevel: 1,
    },
    {
      name: 'Single group',
      groups: ['Portal_Users'],
      expectedLevel: 1,
    },
    {
      name: 'Multiple groups',
      groups: ['Portal_Users', 'Portal_Employees', 'Portal_Managers'],
      expectedLevel: 3,
    },
    {
      name: 'All groups',
      groups: [
        'Portal_Users',
        'Portal_Employees',
        'Portal_Managers',
        'Portal_Executives',
        'Portal_TopSecret',
      ],
      expectedLevel: 5,
    },
    {
      name: 'Non-existent group',
      groups: ['NonExistent_Group'],
      expectedLevel: 1,
    },
  ];

  for (const testCase of testCases) {
    const mockUser = { adfsGroups: testCase.groups };
    const calculatedLevel = await User.calculateSecurityLevel(mockUser);
    const passed = calculatedLevel === testCase.expectedLevel;

    console.log(`Test: ${testCase.name}`);
    console.log(`   Groups: ${testCase.groups.join(', ') || 'none'}`);
    console.log(`   Expected: ${testCase.expectedLevel}`);
    console.log(`   Calculated: ${calculatedLevel}`);
    console.log(`   ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log('');
  }
};

/**
 * Main test function
 */
const runTests = async () => {
  try {
    console.log('\n🧪 Security System Tests\n');

    await testClassificationGroups();
    await testUserSecurityLevels();
    await testSecurityCalculation();
    await testResourceFiltering();

    console.log('========================================');
    console.log('✅ All tests completed!');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run tests
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
