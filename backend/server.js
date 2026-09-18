import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import setupSecurityMiddleware from './middleware/security.js';
import apiRateLimiter from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/healthRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Trust reverse proxy (Cloud Run, Nginx) so client IP and protocol are properly recognized
app.set('trust proxy', 1);

// 1. Security Middleware (Helmet & CORS)
setupSecurityMiddleware(app);

// 2. Parse JSON Request Bodies
app.use(express.json());

// 3. Rate Limiting Middleware on API Endpoints
app.use('/api/', apiRateLimiter);

// 4. API Routes
app.use('/api/health', healthRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/contact', leadRoutes);
app.use('/api/submissions', leadRoutes);
app.use('/api/gemini', geminiRoutes);

// Function to start the Express server
export async function startBackendServer() {
  // Initialize Database connection asynchronously (with resilient local fallback)
  connectDB().catch(() => {});

  return new Promise((resolve) => {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Production Express server running on port ${PORT}`);
      resolve(server);
    });
  });
}

// Auto-run if executed directly as main script
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  startBackendServer().catch((err) => {
    console.error('Fatal backend startup failure:', err);
  });
}

export default app;
