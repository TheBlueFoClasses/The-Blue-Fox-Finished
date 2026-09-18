import rateLimit from 'express-rate-limit';

/**
 * Rate limiter middleware to prevent brute force and DDoS attacks.
 * Allows 100 requests per 15 minutes per IP.
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  // Disable proxy validation checks since the app runs behind Cloud Run / Nginx reverse proxy
  validate: {
    xForwardedForHeader: false,
    forwardedHeader: false,
  },
  message: {
    error: 'Too many requests from this IP address. Please try again after 15 minutes.',
  },
});

export default apiRateLimiter;
