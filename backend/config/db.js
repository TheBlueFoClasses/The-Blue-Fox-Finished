import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let lastAttemptTime = 0;
let isAttempting = false;
let hasReportedUnreachable = false;

/**
 * Connects to MongoDB Atlas using Mongoose.
 * Prefers process.env.MONGODB_URL, falls back to process.env.MONGODB_URI.
 * Gracefully handles unreachable hosts or invalid credentials without crashing.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  // Reuse existing connection if already connected (state 1 = connected)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If already connecting, return current connection promise
  if (mongoose.connection.readyState === 2) {
    return mongoose.connection;
  }

  // Rate-limit retries if cluster is currently unreachable (wait at least 30 seconds between retry attempts)
  const now = Date.now();
  if (now - lastAttemptTime < 30000 && hasReportedUnreachable) {
    return null;
  }

  if (isAttempting) {
    return null;
  }

  isAttempting = true;
  lastAttemptTime = now;

  try {
    await mongoose.connect(uri, {
      dbName: 'the_blue_fox',
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    });
    hasReportedUnreachable = false;
    console.log('✅ Connected to MongoDB Atlas database "the_blue_fox" successfully!');
    return mongoose.connection;
  } catch (error) {
    hasReportedUnreachable = true;
    // Log informative diagnostic note without throwing a fatal server error
    console.info(
      `ℹ️ MongoDB Atlas cluster is currently unreachable (${error?.code || 'offline'}). Operating with local resilient storage for inquiries.`
    );
    return null;
  } finally {
    isAttempting = false;
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

export default connectDB;
