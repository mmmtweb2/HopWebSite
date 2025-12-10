import {
  getDepartments,
  getDepartmentById,
  getDepartmentActions,
  getDepartmentSections,
  getSectionContent,
  getSectionAbout
} from '../services/mockData';

/**
 * Departments Service
 * Handles all department-related API calls
 */

// Simulate network delay
const simulateNetworkDelay = () => {
  const delay = Math.floor(Math.random() * 500) + 300; // 300-800ms
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Get all departments
 * @returns {Promise<Array>}
 */
export const fetchDepartments = async () => {
  await simulateNetworkDelay();
  return await getDepartments();
};

/**
 * Get department by ID
 * @param {string} departmentId
 * @returns {Promise<Object>}
 */
export const fetchDepartmentById = async (departmentId) => {
  await simulateNetworkDelay();
  return await getDepartmentById(departmentId);
};

/**
 * Get department actions/quick links
 * @param {string} departmentId
 * @returns {Promise<Array>}
 */
export const fetchDepartmentActions = async (departmentId) => {
  await simulateNetworkDelay();
  return await getDepartmentActions(departmentId);
};

/**
 * Get department sections (for complex department)
 * @param {string} departmentId
 * @returns {Promise<Array>}
 */
export const fetchDepartmentSections = async (departmentId) => {
  await simulateNetworkDelay();
  return await getDepartmentSections(departmentId);
};

/**
 * Get section content
 * @param {string} sectionId
 * @param {string} contentType
 * @returns {Promise<Array>}
 */
export const fetchSectionContent = async (sectionId, contentType) => {
  await simulateNetworkDelay();
  return await getSectionContent(sectionId, contentType);
};

/**
 * Get section about information
 * @param {string} sectionId
 * @returns {Promise<Object>}
 */
export const fetchSectionAbout = async (sectionId) => {
  await simulateNetworkDelay();
  return await getSectionAbout(sectionId);
};

/**
 * Update department (mock for future backend)
 * @param {string} departmentId
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export const updateDepartment = async (departmentId, data) => {
  await simulateNetworkDelay();

  // Mock implementation - replace with actual API call
  return {
    success: true,
    message: "Department updated successfully",
    departmentId,
    data
  };
};
