/**
 * Apps Controller
 * Handles requests for the Apps Page
 */

import App from '../models/App.js';
import { filterBySecurityLevel } from '../middleware/securityMiddleware.js';
import { mapArrayToDTO, mapAppToDTO } from '../utils/dtoMapper.js';

/**
 * @route   GET /api/apps
 * @desc    Get all active apps (filtered by user's security level)
 * @access  Public
 */
const getApps = async (req, res) => {
  try {
    // Get all active apps from MongoDB
    const allApps = await App.find({ isActive: true }).sort({ createdAt: -1 });

    // Get user's security level (set by calculateSecurityLevel middleware)
    const userSecurityLevel = req.userSecurityLevel || 1;

    // Filter apps by security level
    const accessibleApps = filterBySecurityLevel(allApps, userSecurityLevel);

    // Map to Unified DTO
    const dtoApps = mapArrayToDTO(accessibleApps, 'app');

    res.status(200).json({
      success: true,
      count: dtoApps.length,
      totalApps: allApps.length,
      userSecurityLevel: userSecurityLevel,
      data: dtoApps,
    });
  } catch (error) {
    console.error('Error fetching apps:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch apps',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/apps/:id
 * @desc    Get single app by ID (with security check)
 * @access  Public
 */
const getAppById = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);

    if (!app) {
      return res.status(404).json({
        success: false,
        message: 'App not found',
      });
    }

    // Check if user has sufficient security level
    const userSecurityLevel = req.userSecurityLevel || 1;
    const requiredLevel = app.minSecurityLevel || 1;

    if (userSecurityLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient security clearance to access this app',
        required: requiredLevel,
        current: userSecurityLevel,
      });
    }

    // Map to Unified DTO
    const dtoApp = mapAppToDTO(app);

    res.status(200).json({
      success: true,
      data: dtoApp,
    });
  } catch (error) {
    console.error('Error fetching app:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch app',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/apps
 * @desc    Create new app
 * @access  Private (Admin only in production)
 */
const createApp = async (req, res) => {
  try {
    const { title, description, image, link, icon, color, category, minSecurityLevel } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const app = await App.create({
      title,
      description,
      image,
      link,
      icon,
      color,
      category,
      minSecurityLevel: minSecurityLevel || 1,
    });

    // Map to Unified DTO
    const dtoApp = mapAppToDTO(app);

    res.status(201).json({
      success: true,
      message: 'App created successfully',
      data: dtoApp,
    });
  } catch (error) {
    console.error('Error creating app:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to create app',
      error: error.message,
    });
  }
};

/**
 * @route   PUT /api/apps/:id
 * @desc    Update app
 * @access  Private (Admin only in production)
 */
const updateApp = async (req, res) => {
  try {
    const app = await App.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!app) {
      return res.status(404).json({
        success: false,
        message: 'App not found',
      });
    }

    // Map to Unified DTO
    const dtoApp = mapAppToDTO(app);

    res.status(200).json({
      success: true,
      message: 'App updated successfully',
      data: dtoApp,
    });
  } catch (error) {
    console.error('Error updating app:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to update app',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/apps/:id
 * @desc    Delete app (soft delete - set isActive to false)
 * @access  Private (Admin only in production)
 */
const deleteApp = async (req, res) => {
  try {
    const app = await App.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!app) {
      return res.status(404).json({
        success: false,
        message: 'App not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'App deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting app:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to delete app',
      error: error.message,
    });
  }
};

export {
  getApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
};
