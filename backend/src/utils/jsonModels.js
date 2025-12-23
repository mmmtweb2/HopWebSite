/**
 * JSON Database Models
 * Provides Mongoose-like interface for JSON database
 * Use these instead of Mongoose models when working with JSON storage
 */

import { getCollection } from './jsonDB.js';

/**
 * User Model (JSON Database)
 */
class UserModel {
  constructor() {
    this.collection = getCollection('users');
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    return this.collection.findById(id);
  }

  /**
   * Find user by username
   */
  async findByUsername(username) {
    return this.collection.findOne({ username: username.toLowerCase() });
  }

  /**
   * Find all users
   */
  async find(query = {}) {
    return this.collection.find(query);
  }

  /**
   * Calculate user's security level based on ADFS groups
   */
  async calculateSecurityLevel(user) {
    if (!user || !user.adfsGroups || user.adfsGroups.length === 0) {
      return 1;
    }

    const classificationGroupModel = new ClassificationGroupModel();
    const maxLevel = await classificationGroupModel.getMaxLevelFromGroups(
      user.adfsGroups
    );

    return maxLevel;
  }

  /**
   * Create new user
   */
  async create(userData) {
    return this.collection.insertOne(userData);
  }

  /**
   * Update user
   */
  async updateById(id, updates) {
    return this.collection.updateById(id, updates);
  }

  /**
   * Delete user (soft delete)
   */
  async deleteById(id) {
    return this.collection.deleteById(id);
  }

  /**
   * Get user's role in Hebrew
   */
  getRoleHebrew(role) {
    const roleMap = {
      admin: 'מנהל',
      editor: 'עורך',
      viewer: 'צופה',
    };
    return roleMap[role] || role;
  }
}

/**
 * Classification Group Model (JSON Database)
 */
class ClassificationGroupModel {
  constructor() {
    this.collection = getCollection('classificationGroups');
  }

  /**
   * Find group by ADFS name
   */
  async findByAdfsName(adfsGroupName) {
    return this.collection.findOne({ adfsGroupName });
  }

  /**
   * Find all groups
   */
  async find(query = {}) {
    return this.collection.find(query);
  }

  /**
   * Get maximum security level from list of ADFS group names
   */
  async getMaxLevelFromGroups(groupNames) {
    if (!groupNames || groupNames.length === 0) {
      return 1; // Default minimum level
    }

    const groups = this.collection.find({
      adfsGroupName: groupNames, // jsonDB handles array matching with $in logic
      isActive: true,
    });

    if (groups.length === 0) {
      return 1;
    }

    return Math.max(...groups.map((g) => g.level));
  }

  /**
   * Create new group
   */
  async create(groupData) {
    return this.collection.insertOne(groupData);
  }

  /**
   * Update group
   */
  async updateById(id, updates) {
    return this.collection.updateById(id, updates);
  }

  /**
   * Delete group (soft delete)
   */
  async deleteById(id) {
    return this.collection.deleteById(id);
  }
}

/**
 * App Model (JSON Database)
 */
class AppModel {
  constructor() {
    this.collection = getCollection('apps');
  }

  async findById(id) {
    return this.collection.findById(id);
  }

  async find(query = {}) {
    return this.collection.find(query);
  }

  async create(appData) {
    return this.collection.insertOne(appData);
  }

  async updateById(id, updates) {
    return this.collection.updateById(id, updates);
  }

  async deleteById(id) {
    return this.collection.deleteById(id);
  }
}

/**
 * File Resource Model (JSON Database)
 */
class FileResourceModel {
  constructor() {
    this.collection = getCollection('fileResources');
  }

  async findById(id) {
    return this.collection.findById(id);
  }

  async find(query = {}) {
    return this.collection.find(query);
  }

  async create(fileData) {
    return this.collection.insertOne(fileData);
  }

  async updateById(id, updates) {
    return this.collection.updateById(id, updates);
  }

  async deleteById(id) {
    return this.collection.deleteById(id);
  }

  /**
   * Get file URL virtual property
   */
  getFileUrl(fileResource) {
    return `/uploads/${fileResource.fileName}`;
  }
}

// Export model instances (singleton pattern)
export const User = new UserModel();
export const ClassificationGroup = new ClassificationGroupModel();
export const App = new AppModel();
export const FileResource = new FileResourceModel();
