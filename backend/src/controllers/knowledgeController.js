/**
 * Knowledge Base Controller
 * Handles requests for Knowledge Base articles (Real-Time Data)
 * NOTE: This controller does NOT use MongoDB - it fetches from RealTimeService
 */

import { fetchKnowledge } from '../services/RealTimeService.js';
import { mapArrayToDTO } from '../utils/dtoMapper.js';

/**
 * @route   GET /api/knowledge
 * @desc    Get all knowledge base articles from external system
 * @access  Public
 */
const getKnowledgeArticles = async (req, res) => {
  try {
    // Fetch from Real-Time Service (simulated external system)
    const articles = await fetchKnowledge();

    // Map to Unified DTO
    const dtoArticles = mapArrayToDTO(articles, 'knowledge');

    res.status(200).json({
      success: true,
      count: dtoArticles.length,
      data: dtoArticles,
      source: 'real-time',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching knowledge articles:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch knowledge base articles',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/knowledge/:id
 * @desc    Get single knowledge article by ID
 * @access  Public
 */
const getKnowledgeArticleById = async (req, res) => {
  try {
    const articles = await fetchKnowledge();
    const article = articles.find((a) => a.id === req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }

    // Map to Unified DTO
    const dtoArticle = mapArrayToDTO([article], 'knowledge')[0];

    res.status(200).json({
      success: true,
      data: dtoArticle,
      source: 'real-time',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching knowledge article:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch article',
      error: error.message,
    });
  }
};

export {
  getKnowledgeArticles,
  getKnowledgeArticleById,
};
