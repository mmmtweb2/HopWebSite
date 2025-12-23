/**
 * Security Middleware (JSON Database Version)
 * Calculates user's security level based on ADFS groups and attaches it to request
 */

import { User, ClassificationGroup, App, FileResource } from '../utils/jsonModels.js';

/**
 * Calculate Security Level Middleware
 *
 * Gets userId from headers/body, finds user in DB, calculates their security level
 * based on ADFS groups, and attaches it to req.userSecurityLevel
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const calculateSecurityLevel = async (req, res, next) => {
  try {
    // Get userId from headers (simulating authentication)
    // In production, this would come from JWT or session
    const userId =
      req.headers['x-user-id'] || req.body.userId || req.query.userId;

    // If no userId provided, set default minimum level
    if (!userId) {
      console.warn('⚠️  No userId provided, using default security level 1');
      req.userSecurityLevel = 1;
      req.user = null;
      return next();
    }

    // Find user by ID or username
    let user;
    if (userId.match(/^[0-9a-zA-Z]{15,}$/)) {
      // JSON DB ID format (15+ alphanumeric chars)
      user = await User.findById(userId);
    } else {
      // Treat as username
      user = await User.findByUsername(userId);
    }

    // If user not found, use default minimum level
    if (!user) {
      console.warn(`⚠️  User not found: ${userId}, using default security level 1`);
      req.userSecurityLevel = 1;
      req.user = null;
      return next();
    }

    // Calculate user's security level based on ADFS groups
    const securityLevel = await User.calculateSecurityLevel(user);

    // Attach to request object
    req.userSecurityLevel = securityLevel;
    req.user = user;
    req.userRole = user.role;

    // Log for debugging
    console.log(
      `✅ User: ${user.username} | Role: ${user.role} | Security Level: ${securityLevel}`
    );

    next();
  } catch (error) {
    console.error('❌ Error in calculateSecurityLevel middleware:', error.message);

    // On error, use default minimum level and continue
    // This prevents security middleware from breaking the application
    req.userSecurityLevel = 1;
    req.user = null;

    next();
  }
};

/**
 * Require Minimum Security Level Middleware Factory
 *
 * Creates middleware that checks if user has minimum required security level
 *
 * @param {number} minLevel - Minimum required security level (1-5)
 * @returns {Function} Express middleware function
 */
const requireSecurityLevel = (minLevel) => {
  return (req, res, next) => {
    const userLevel = req.userSecurityLevel || 1;

    if (userLevel < minLevel) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient security clearance',
        required: minLevel,
        current: userLevel,
      });
    }

    next();
  };
};

/**
 * Filter Resources by Security Level
 *
 * Filters array of resources based on user's security level
 * Only returns resources where minSecurityLevel <= user's level
 *
 * @param {Array} resources - Array of resources with minSecurityLevel
 * @param {number} userLevel - User's security level
 * @returns {Array} Filtered resources
 */
const filterBySecurityLevel = (resources, userLevel) => {
  if (!Array.isArray(resources)) {
    return [];
  }

  return resources.filter((resource) => {
    const minLevel = resource.minSecurityLevel || 1;
    return userLevel >= minLevel;
  });
};

/**
 * Check Resource Access Middleware Factory
 *
 * Checks if user can access a specific resource based on security level
 * Used for single resource GET requests
 *
 * @param {string} modelName - Name of the model to check ('App' or 'FileResource')
 * @returns {Function} Express middleware function
 */
const checkResourceAccess = (modelName) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userLevel = req.userSecurityLevel || 1;

      // Get the model from imported models
      const models = { User, ClassificationGroup, App, FileResource };
      const Model = models[modelName];

      if (!Model) {
        return res.status(500).json({
          success: false,
          message: `Model ${modelName} not found`,
        });
      }

      // Find the resource
      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: `${modelName} not found`,
        });
      }

      // Check security level
      const minLevel = resource.minSecurityLevel || 1;

      if (userLevel < minLevel) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient security clearance to access this resource',
          required: minLevel,
          current: userLevel,
        });
      }

      // Attach resource to request for use in controller
      req.resource = resource;
      next();
    } catch (error) {
      console.error('❌ Error in checkResourceAccess middleware:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Server error checking resource access',
        error: error.message,
      });
    }
  };
};

export {
  calculateSecurityLevel,
  requireSecurityLevel,
  filterBySecurityLevel,
  checkResourceAccess,
};
