/**
 * Global 404 Not Found Handler for unmatched API routes
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: 'Route Not Found',
    path: req.originalUrl,
  });
}

/**
 * Global Error Handling Middleware
 * Ensures sensitive server stack traces and internal errors are never exposed to clients in production.
 */
export function errorHandler(err, req, res, next) {
  console.error('🔥 Internal Server Error:', err);

  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    error: isProduction ? 'An unexpected server error occurred. Please try again later.' : (err.message || 'Internal Server Error'),
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

export default errorHandler;

