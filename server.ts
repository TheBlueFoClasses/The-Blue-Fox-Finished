import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import app from './backend/server.js';
import connectDB from './backend/config/db.js';
import { notFoundHandler, errorHandler } from './backend/middleware/errorHandler.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  // Initialize Database connection asynchronously (with resilient local fallback)
  connectDB().catch(() => {});

  // Serve Frontend / Integrate Vite Middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running in Development mode - mounting Vite middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Running in Production mode - serving static files from dist...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('/js', express.static(path.join(process.cwd(), 'js')));
    app.use('/css', express.static(path.join(process.cwd(), 'css')));
    app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
    app.get('*', (req, res, next) => {
      if (req.originalUrl.startsWith('/api/')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
          next();
        }
      });
    });
  }

  // 404 and Error Handling Middleware
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express Server running on port ${PORT}`);
  });
}

// Start backend server
startServer().catch((err) => {
  console.error('Fatal server startup failure:', err);
});

