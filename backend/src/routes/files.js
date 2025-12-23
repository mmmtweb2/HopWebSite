/**
 * Files Routes
 * Defines routes for file upload and file resources API
 */

import express from 'express';
import upload from '../utils/multerConfig.js';
import {
  getFiles,
  getFileById,
  uploadFile,
  downloadFile,
  deleteFile,
} from '../controllers/filesController.js';

const router = express.Router();

// @route   GET /api/files
// @desc    Get all files (with optional filters)
// @query   ?category=extended-knowledge&area=north
// @access  Public
router.get('/', getFiles);

// @route   GET /api/files/:id
// @desc    Get single file
// @access  Public
router.get('/:id', getFileById);

// @route   POST /api/files
// @desc    Upload file and save metadata
// @access  Private (TODO: Add auth middleware in production)
// @note    Uses Multer middleware for file upload
router.post('/', upload.single('file'), uploadFile);

// @route   GET /api/files/download/:id
// @desc    Download file
// @access  Public
router.get('/download/:id', downloadFile);

// @route   DELETE /api/files/:id
// @desc    Delete file
// @access  Private (TODO: Add auth middleware in production)
router.delete('/:id', deleteFile);

export default router;
