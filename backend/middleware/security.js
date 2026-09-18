import helmet from 'helmet';
import cors from 'cors';

/**
 * Configure Security Middleware (Helmet and CORS)
 */
export function setupSecurityMiddleware(app) {
  // Explicitly remove Express brand header
  app.disable('x-powered-by');

  // Helmet sets essential HTTP security headers (e.g. X-Content-Type-Options, Strict-Transport-Security, X-Frame-Options)
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disabled to support preview iframes & Vite HMR
      crossOriginEmbedderPolicy: false,
      hidePoweredBy: true,
    })
  );

  // Configure CORS to permit frontend clients while restricting untrusted methods
  const corsOptions = {
    origin: true, // Allow requesting origins (e.g., GitHub Pages frontend or custom domain)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // Preflight cache for 24 hours
  };

  app.use(cors(corsOptions));
}

export default setupSecurityMiddleware;

