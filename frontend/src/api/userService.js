import { getUserInfo } from '../services/mockData';

/**
 * User Service
 * Handles all user-related API calls
 */

// Simulate network delay
const simulateNetworkDelay = () => {
  const delay = Math.floor(Math.random() * 500) + 300; // 300-800ms
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Get current user information
 * @returns {Promise<Object>} User object
 */
export const getCurrentUser = async () => {
  await simulateNetworkDelay();
  return await getUserInfo();
};

/**
 * Mock login function (for future backend integration)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export const login = async (email, password) => {
  await simulateNetworkDelay();

  // Mock implementation - replace with actual API call
  if (email && password) {
    return {
      success: true,
      user: {
        name: "ישראל ישראלי",
        email: email,
        role: "admin",
        permissions: ["edit_content", "view_reports", "manage_users", "manage_departments"]
      },
      token: "mock_jwt_token_" + Date.now()
    };
  }

  throw new Error("Invalid credentials");
};

/**
 * Mock logout function
 * @returns {Promise<Object>}
 */
export const logout = async () => {
  await simulateNetworkDelay();
  return { success: true };
};

/**
 * Check if user has specific permission
 * @param {Object} user
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};
