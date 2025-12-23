/**
 * Files Controller
 * Handles file uploads and file resource management
 */

import FileResource from '../models/FileResource.js';
import { mapArrayToDTO, mapFileToDTO } from '../utils/dtoMapper.js';
import path from 'path';
import fs from 'fs';

/**
 * @route   GET /api/files
 * @desc    Get all active file resources
 * @query   ?category=extended-knowledge|overlaps&area=north|center|south
 * @access  Public
 */
const getFiles = async (req, res) => {
  try {
    const { category, area } = req.query;

    // Build query
    const query = { isActive: true };
    if (category) query.sectionCategory = category;
    if (area && area !== 'all') query.area = area;

    const files = await FileResource.find(query).sort({ createdAt: -1 });

    // Map to Unified DTO
    const dtoFiles = mapArrayToDTO(files, 'file');

    res.status(200).json({
      success: true,
      count: dtoFiles.length,
      data: dtoFiles,
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch files',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/files/:id
 * @desc    Get single file resource by ID
 * @access  Public
 */
const getFileById = async (req, res) => {
  try {
    const file = await FileResource.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Map to Unified DTO
    const dtoFile = mapFileToDTO(file);

    res.status(200).json({
      success: true,
      data: dtoFile,
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch file',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/files
 * @desc    Upload file and save metadata
 * @access  Private (Auth required in production)
 * @note    This route uses Multer middleware (added in routes)
 */
const uploadFile = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { title, description, sectionCategory, area, tags, uploadedBy } = req.body;

    // Validation
    if (!title || !sectionCategory) {
      // Delete uploaded file if validation fails
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: 'Title and section category are required',
      });
    }

    // Create file resource record
    const fileResource = await FileResource.create({
      title,
      description,
      filePath: req.file.path,
      fileName: req.file.filename,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      sectionCategory,
      area: area || 'all',
      tags: tags ? JSON.parse(tags) : [],
      uploadedBy: uploadedBy || 'system',
    });

    // Map to Unified DTO
    const dtoFile = mapFileToDTO(fileResource);

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: dtoFile,
    });
  } catch (error) {
    console.error('Error uploading file:', error);

    // Delete uploaded file if database save fails
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to upload file',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/files/download/:id
 * @desc    Download file
 * @access  Public
 */
const downloadFile = async (req, res) => {
  try {
    const file = await FileResource.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Increment download counter
    file.downloads += 1;
    await file.save();

    // Send file
    res.download(file.filePath, file.fileName);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to download file',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/files/:id
 * @desc    Delete file (soft delete - set isActive to false)
 * @access  Private (Admin only in production)
 */
const deleteFile = async (req, res) => {
  try {
    const file = await FileResource.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Optionally delete physical file from disk
    // fs.unlinkSync(file.filePath);

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to delete file',
      error: error.message,
    });
  }
};

export {
  getFiles,
  getFileById,
  uploadFile,
  downloadFile,
  deleteFile,
};
