/**
 * User Model
 * Stores user information including ADFS groups and RBAC roles
 */

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Username cannot be more than 50 characters'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
    adfsGroups: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: 'ADFS groups must be an array',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'editor', 'viewer'],
        message: '{VALUE} is not a valid role',
      },
      default: 'viewer',
      required: [true, 'User role is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ role: 1, isActive: 1 });

// Method to calculate user's security level based on ADFS groups
UserSchema.methods.calculateSecurityLevel = async function () {
  const ClassificationGroup = mongoose.model('ClassificationGroup');

  if (!this.adfsGroups || this.adfsGroups.length === 0) {
    return 1; // Default minimum level
  }

  const maxLevel = await ClassificationGroup.getMaxLevelFromGroups(this.adfsGroups);
  return maxLevel;
};

// Method to check if user has a specific ADFS group
UserSchema.methods.hasGroup = function (groupName) {
  return this.adfsGroups.includes(groupName);
};

// Method to update last login
UserSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  return await this.save();
};

// Static method to find user by username (case insensitive)
UserSchema.statics.findByUsername = async function (username) {
  return await this.findOne({
    username: username.toLowerCase(),
    isActive: true,
  });
};

// Virtual for displaying user's role in Hebrew
UserSchema.virtual('roleHebrew').get(function () {
  const roleMap = {
    admin: 'מנהל',
    editor: 'עורך',
    viewer: 'צופה',
  };
  return roleMap[this.role] || this.role;
});

// Ensure virtuals are included in JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export default mongoose.model('User', UserSchema);
