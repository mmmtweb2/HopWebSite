import {
  getServerLoad,
  getActiveUsers,
  getAlerts,
  getSystemStatus,
  getNetworkTraffic,
  getDatabaseConnections,
  getAllMetrics
} from '../services/mockData';

/**
 * Reports & Metrics Service
 * Handles all real-time metrics and reports API calls
 */

// Simulate network delay
const simulateNetworkDelay = () => {
  const delay = Math.floor(Math.random() * 500) + 300; // 300-800ms
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Get server load metric
 * @returns {Promise<Object>}
 */
export const fetchServerLoad = async () => {
  await simulateNetworkDelay();
  return await getServerLoad();
};

/**
 * Get active users count
 * @returns {Promise<Object>}
 */
export const fetchActiveUsers = async () => {
  await simulateNetworkDelay();
  return await getActiveUsers();
};

/**
 * Get system alerts
 * @returns {Promise<Object>}
 */
export const fetchAlerts = async () => {
  await simulateNetworkDelay();
  return await getAlerts();
};

/**
 * Get system status
 * @returns {Promise<Object>}
 */
export const fetchSystemStatus = async () => {
  await simulateNetworkDelay();
  return await getSystemStatus();
};

/**
 * Get network traffic data
 * @returns {Promise<Object>}
 */
export const fetchNetworkTraffic = async () => {
  await simulateNetworkDelay();
  return await getNetworkTraffic();
};

/**
 * Get database connections count
 * @returns {Promise<Object>}
 */
export const fetchDatabaseConnections = async () => {
  await simulateNetworkDelay();
  return await getDatabaseConnections();
};

/**
 * Get all metrics at once
 * @returns {Promise<Object>}
 */
export const fetchAllMetrics = async () => {
  await simulateNetworkDelay();
  return await getAllMetrics();
};

/**
 * Get historical metrics for charts
 * @param {string} metric - Metric name (serverLoad, activeUsers, etc.)
 * @param {number} hours - Hours of history to fetch (default: 24)
 * @returns {Promise<Array>}
 */
export const fetchHistoricalMetrics = async (metric, hours = 24) => {
  await simulateNetworkDelay();

  // Mock historical data generation
  const dataPoints = hours * 6; // One point every 10 minutes
  const data = [];
  const now = Date.now();

  for (let i = dataPoints; i >= 0; i--) {
    const timestamp = now - (i * 10 * 60 * 1000);
    let value;

    switch (metric) {
      case 'serverLoad':
        value = Math.floor(Math.random() * 40) + 30; // 30-70%
        break;
      case 'activeUsers':
        value = Math.floor(Math.random() * 200) + 100; // 100-300
        break;
      case 'networkTraffic':
        value = (Math.random() * 50 + 50).toFixed(1); // 50-100 Mbps
        break;
      default:
        value = Math.floor(Math.random() * 100);
    }

    data.push({
      timestamp,
      time: new Date(timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      value
    });
  }

  return data;
};
