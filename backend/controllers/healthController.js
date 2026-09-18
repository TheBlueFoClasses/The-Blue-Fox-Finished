import mongoose from 'mongoose';

/**
 * Controller to check server and database status
 */
export function getHealthStatus(req, res) {
  const isDbConnected = mongoose.connection.readyState === 1;
  const isDbConfigured = !!(process.env.MONGODB_URL || process.env.MONGODB_URI);
  const isGeminiConfigured = !!process.env.GEMINI_API_KEY;

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: {
        configured: isDbConfigured,
        connected: isDbConnected,
      },
      gemini: {
        configured: isGeminiConfigured,
      },
    },
  });
}

export default { getHealthStatus };
