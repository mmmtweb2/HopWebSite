/**
 * FileResource Model
 * Stores metadata for uploaded files (Extended Knowledge & Overlaps pages)
 */

import mongoose from 'mongoose';

const FileResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'File title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number, // Size in bytes
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    sectionCategory: {
      type: String,
      enum: ['extended-knowledge', 'overlaps', 'general'],
      required: [true, 'Section category is required'],
    },
    area: {
      type: String,
      enum: ['north', 'center', 'south', 'all'],
      default: 'all',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    uploadedBy: {
      type: String, // User ID or name
      default: 'system',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    minSecurityLevel: {
      type: Number,
      default: 1,
      min: [1, 'Minimum security level is 1'],
      max: [5, 'Maximum security level is 5'],
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
        message: 'Security level must be an integer',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for filtering
FileResourceSchema.index({ sectionCategory: 1, area: 1, isActive: 1 });
FileResourceSchema.index({ createdAt: -1 });

// Virtual for file URL
FileResourceSchema.virtual('fileUrl').get(function () {
  return `/uploads/${this.fileName}`;
});

// Ensure virtuals are included in JSON
FileResourceSchema.set('toJSON', { virtuals: true });
FileResourceSchema.set('toObject', { virtuals: true });

export default mongoose.model('FileResource', FileResourceSchema);
