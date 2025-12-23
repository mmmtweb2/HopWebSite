/**
 * DTO Mapper Utility
 * Maps different data models to the Unified DTO structure
 *
 * Unified DTO Format:
 * {
 *   id: String,
 *   title: String,
 *   description: String (optional),
 *   image: String (URL/Path - optional),
 *   link: String (URL - optional),
 *   date: String (DD/MM/YYYY - optional),
 *   time: String (HH:MM - optional)
 * }
 */

/**
 * Format date to DD/MM/YYYY
 * @param {Date|String} date
 * @returns {String|null}
 */
const formatDate = (date) => {
  if (!date) return null;

  const d = new Date(date);
  if (isNaN(d.getTime())) return null;

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format time to HH:MM
 * @param {Date|String} date
 * @returns {String|null}
 */
const formatTime = (date) => {
  if (!date) return null;

  const d = new Date(date);
  if (isNaN(d.getTime())) return null;

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

/**
 * Map App Model to Unified DTO
 * @param {Object} app - Mongoose App document
 * @returns {Object} - Unified DTO
 */
const mapAppToDTO = (app) => {
  return {
    id: app._id.toString(),
    title: app.title,
    description: app.description || null,
    image: app.image || null,
    link: app.link || null,
    date: formatDate(app.createdAt),
    time: formatTime(app.createdAt),
    // Extra fields for Apps page
    icon: app.icon,
    color: app.color,
    category: app.category,
  };
};

/**
 * Map FileResource Model to Unified DTO
 * @param {Object} file - Mongoose FileResource document
 * @returns {Object} - Unified DTO
 */
const mapFileToDTO = (file) => {
  return {
    id: file._id.toString(),
    title: file.title,
    description: file.description || null,
    image: null, // Files don't have images
    link: file.fileUrl || `/uploads/${file.fileName}`, // Download link
    date: formatDate(file.createdAt),
    time: formatTime(file.createdAt),
    // Extra fields for file resources
    fileName: file.fileName,
    fileSize: file.fileSize,
    mimeType: file.mimeType,
    area: file.area,
    downloads: file.downloads,
  };
};

/**
 * Map Real-Time Report to Unified DTO
 * @param {Object} report - Report object from RealTimeService
 * @returns {Object} - Unified DTO
 */
const mapReportToDTO = (report) => {
  return {
    id: report.id || report._id?.toString(),
    title: report.title,
    description: report.description || null,
    image: report.image || null,
    link: report.link || null,
    date: report.date ? formatDate(report.date) : null,
    time: report.time || null,
    // Extra fields for reports
    tag: report.tag,
    timeCategory: report.timeCategory,
    level: report.level,
    area: report.area,
  };
};

/**
 * Map Knowledge Article to Unified DTO
 * @param {Object} article - Article object from RealTimeService
 * @returns {Object} - Unified DTO
 */
const mapKnowledgeToDTO = (article) => {
  return {
    id: article.id || article._id?.toString(),
    title: article.title,
    description: article.description || article.content || null,
    image: article.image || null,
    link: article.link || null,
    date: article.date ? formatDate(article.date) : null,
    time: article.time || null,
    // Extra fields for knowledge base
    category: article.category,
    tags: article.tags,
  };
};

/**
 * Map array of items to Unified DTOs
 * @param {Array} items - Array of documents/objects
 * @param {String} type - Type of mapping ('app', 'file', 'report', 'knowledge')
 * @returns {Array} - Array of Unified DTOs
 */
const mapArrayToDTO = (items, type) => {
  if (!Array.isArray(items)) return [];

  const mappers = {
    app: mapAppToDTO,
    file: mapFileToDTO,
    report: mapReportToDTO,
    knowledge: mapKnowledgeToDTO,
  };

  const mapper = mappers[type];
  if (!mapper) {
    throw new Error(`Invalid mapper type: ${type}`);
  }

  return items.map(mapper);
};

export {
  mapAppToDTO,
  mapFileToDTO,
  mapReportToDTO,
  mapKnowledgeToDTO,
  mapArrayToDTO,
  formatDate,
  formatTime,
};
