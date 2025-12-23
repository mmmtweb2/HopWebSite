/**
 * Reports Controller
 * Handles requests for Situation Reports (Real-Time Data)
 * NOTE: This controller does NOT use MongoDB - it fetches from RealTimeService
 */

import { fetchReports } from '../services/RealTimeService.js';
import { mapArrayToDTO } from '../utils/dtoMapper.js';

/**
 * @route   GET /api/reports
 * @desc    Get all situation reports from external system
 * @access  Public
 */
const getReports = async (req, res) => {
  try {
    // Fetch from Real-Time Service (simulated external system)
    const reports = await fetchReports();

    // Map to Unified DTO
    const dtoReports = mapArrayToDTO(reports, 'report');

    res.status(200).json({
      success: true,
      count: dtoReports.length,
      data: dtoReports,
      source: 'real-time',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch situation reports',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/reports/:id
 * @desc    Get single report by ID
 * @access  Public
 */
const getReportById = async (req, res) => {
  try {
    const reports = await fetchReports();
    const report = reports.find((r) => r.id === req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    // Map to Unified DTO
    const dtoReport = mapArrayToDTO([report], 'report')[0];

    res.status(200).json({
      success: true,
      data: dtoReport,
      source: 'real-time',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch report',
      error: error.message,
    });
  }
};

export {
  getReports,
  getReportById,
};
