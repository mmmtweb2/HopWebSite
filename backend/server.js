/**
 * Express Server - Organizational Portal Backend
 * Main entry point for the REST API
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './src/config/db.js';
import { calculateSecurityLevel } from './src/middleware/securityMiddleware.js';

// Import routes
import appsRouter from './src/routes/apps.js';
import filesRouter from './src/routes/files.js';
import reportsRouter from './src/routes/reports.js';
import knowledgeRouter from './src/routes/knowledge.js';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB (optional - using JSON DB for now)
// connectDB();

// ========================================
// MIDDLEWARE
// ========================================

// Enable CORS for frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Security Middleware - Calculate user security level from x-user-id header
app.use('/api', calculateSecurityLevel);

// ========================================
// ROUTES
// ========================================

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Organizational Portal API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Debug endpoint - Shows current user's security context
app.get('/api/debug/me', (req, res) => {
  res.json({
    success: true,
    user: req.user ? {
      id: req.user._id,
      username: req.user.username,
      fullName: req.user.fullName,
      role: req.user.role,
      adfsGroups: req.user.adfsGroups,
    } : null,
    userSecurityLevel: req.userSecurityLevel,
    userRole: req.userRole,
    headers: {
      'x-user-id': req.headers['x-user-id'],
    },
  });
});

// API Routes
app.use('/api/apps', appsRouter);
app.use('/api/files', filesRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/knowledge', knowledgeRouter);

// ========================================
// ERROR HANDLING
// ========================================

// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.url,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large',
      maxSize: process.env.MAX_FILE_SIZE || '10MB',
    });
  }

  // Multer file type errors
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // MongoDB errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('🚀 Organizational Portal Backend');
  console.log('========================================');
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 Server running on port: ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
  console.log(`💾 MongoDB: ${process.env.MONGODB_URI}`);
  console.log('========================================');
  console.log('');
  console.log('📚 Available Endpoints:');
  console.log(`  GET    /                      - API Info`);
  console.log(`  GET    /api/health            - Health Check`);
  console.log(`  GET    /api/debug/me          - Security Context (use x-user-id header)`);
  console.log(`  GET    /api/apps              - Get all apps (filtered by security level)`);
  console.log(`  POST   /api/apps              - Create app`);
  console.log(`  GET    /api/files             - Get all files`);
  console.log(`  POST   /api/files             - Upload file`);
  console.log(`  GET    /api/reports           - Get situation reports`);
  console.log(`  GET    /api/knowledge         - Get knowledge articles`);
  console.log('========================================');
  console.log('💡 Security: Include "x-user-id: username" header to set security level');
  console.log('   Example users: user.basic (L1), manager.department (L3), admin.security (L5)');
  console.log('========================================');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

export default app;

