/**
 * Apps Routes
 * Defines routes for the Apps page API
 */

import express from 'express';
import {
  getApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
} from '../controllers/appsController.js';

const router = express.Router();

// @route   GET /api/apps
// @desc    Get all apps
// @access  Public
router.get('/', getApps);

// @route   GET /api/apps/:id
// @desc    Get single app
// @access  Public
router.get('/:id', getAppById);

// @route   POST /api/apps
// @desc    Create new app
// @access  Private (TODO: Add auth middleware in production)
router.post('/', createApp);

// @route   PUT /api/apps/:id
// @desc    Update app
// @access  Private (TODO: Add auth middleware in production)
router.put('/:id', updateApp);

// @route   DELETE /api/apps/:id
// @desc    Delete app
// @access  Private (TODO: Add auth middleware in production)
router.delete('/:id', deleteApp);

export default router;
