/**
 * Knowledge Base Routes
 * Defines routes for Knowledge Base articles API (Real-Time Data)
 */

import express from 'express';
import {
  getKnowledgeArticles,
  getKnowledgeArticleById,
} from '../controllers/knowledgeController.js';

const router = express.Router();

// @route   GET /api/knowledge
// @desc    Get all knowledge base articles
// @access  Public
router.get('/', getKnowledgeArticles);

// @route   GET /api/knowledge/:id
// @desc    Get single knowledge article
// @access  Public
router.get('/:id', getKnowledgeArticleById);

export default router;
