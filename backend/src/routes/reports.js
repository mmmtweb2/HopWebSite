/**
 * Reports Routes
 * Defines routes for Situation Reports API (Real-Time Data)
 */

import express from 'express';
import {
  getReports,
  getReportById,
} from '../controllers/reportsController.js';

const router = express.Router();

// @route   GET /api/reports
// @desc    Get all situation reports
// @access  Public
router.get('/', getReports);

// @route   GET /api/reports/:id
// @desc    Get single report
// @access  Public
router.get('/:id', getReportById);

export default router;
