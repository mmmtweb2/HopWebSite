/**
 * ClassificationGroup Model
 * Defines security classification groups from ADFS with their security levels
 */

import mongoose from 'mongoose';

const ClassificationGroupSchema = new mongoose.Schema(
  {
    adfsGroupName: {
      type: String,
      required: [true, 'ADFS group name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Group name cannot be more than 100 characters'],
    },
    level: {
      type: Number,
      required: [true, 'Security level is required'],
      min: [1, 'Minimum security level is 1'],
      max: [5, 'Maximum security level is 5'],
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
        message: 'Security level must be an integer',
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ClassificationGroupSchema.index({ adfsGroupName: 1 });
ClassificationGroupSchema.index({ level: 1, isActive: 1 });

// Static method to get level by group name
ClassificationGroupSchema.statics.getLevelByGroupName = async function (groupName) {
  const group = await this.findOne({ adfsGroupName: groupName, isActive: true });
  return group ? group.level : null;
};

// Static method to get max level from multiple groups
ClassificationGroupSchema.statics.getMaxLevelFromGroups = async function (groupNames) {
  if (!groupNames || groupNames.length === 0) {
    return 1; // Default minimum level
  }

  const groups = await this.find({
    adfsGroupName: { $in: groupNames },
    isActive: true,
  });

  if (groups.length === 0) {
    return 1; // Default minimum level
  }

  return Math.max(...groups.map((g) => g.level));
};

export default mongoose.model('ClassificationGroup', ClassificationGroupSchema);
