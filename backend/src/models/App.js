/**
 * App Model
 * Stores application links and metadata for the Apps Page
 */

import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'App title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    image: {
      type: String, // URL or file path
      trim: true,
    },
    link: {
      type: String, // External URL
      trim: true,
      validate: {
        validator: function (v) {
          // Simple URL validation
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid URL',
      },
    },
    icon: {
      type: String, // Lucide icon name or emoji
      default: 'AppWindow',
    },
    color: {
      type: String, // Tailwind gradient class or hex color
      default: 'from-blue-500 to-cyan-600',
    },
    category: {
      type: String,
      enum: ['productivity', 'communication', 'analytics', 'finance', 'hr', 'other'],
      default: 'other',
    },
    isActive: {
      type: Boolean,
      default: true,
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
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for faster queries
AppSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model('App', AppSchema);
