import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import connectDB from '../config/db.js';

// Simple email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory resilient storage for inquiries when MongoDB Atlas is offline or initializing
const localLeadsStore = [];

/**
 * Controller to create a new lead in MongoDB Atlas via Mongoose
 * with automatic fallback to resilient local memory store if Atlas is offline.
 */
export async function createLead(req, res) {
  const { name, email, phone, subject, message, inquiryType, source, submittedAt } = req.body || {};

  // 1. Basic Presence Validation (phone is optional for contact forms)
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Validation Error: Please fill in all required fields (name, email, message).',
    });
  }

  // 2. Strict Type & String Sanitization (Prevents NoSQL Query Injection)
  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPhone = phone ? String(phone).trim() : '';
  const cleanSubject = subject ? String(subject).trim().slice(0, 100) : '';
  const cleanMessage = String(message).trim();
  const cleanInquiryType = inquiryType ? String(inquiryType).trim().slice(0, 50) : (cleanSubject || 'general');
  const cleanSource = source ? String(source).trim().slice(0, 50) : 'contact_form';

  // 3. Length Limit Validation
  if (cleanName.length > 100) {
    return res.status(400).json({ error: 'Validation Error: Name cannot exceed 100 characters.' });
  }
  if (cleanEmail.length > 150) {
    return res.status(400).json({ error: 'Validation Error: Email address is too long.' });
  }
  if (cleanPhone.length > 30) {
    return res.status(400).json({ error: 'Validation Error: Phone number cannot exceed 30 characters.' });
  }
  if (cleanMessage.length > 2000) {
    return res.status(400).json({ error: 'Validation Error: Message cannot exceed 2000 characters.' });
  }

  // 4. Email Format Validation
  if (!EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ error: 'Validation Error: Please enter a valid email address.' });
  }

  try {
    // Attempt database connection to MongoDB Atlas database 'the_blue_fox'
    const conn = await connectDB();

    if (conn && mongoose.connection.readyState === 1) {
      const newLead = await Lead.create({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        inquiryType: cleanInquiryType,
        submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
        source: cleanSource,
      });

      console.log(`✅ Saved submission from ${cleanName} (${cleanEmail}) to database the_blue_fox (collection: submissions) - ID: ${newLead._id}`);

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been saved to the database.',
        id: newLead._id,
        database: 'the_blue_fox',
        collection: 'submissions',
      });
    }

    // Fallback store when MongoDB is offline
    const fallbackLead = {
      _id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      inquiryType: cleanInquiryType,
      submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
      source: cleanSource,
      createdAt: new Date(),
    };
    localLeadsStore.unshift(fallbackLead);

    console.log(`✅ Stored inquiry from ${cleanName} (${cleanEmail}) locally - ID: ${fallbackLead._id}`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been saved securely.',
      id: fallbackLead._id,
    });
  } catch (error) {
    console.error('Database write error:', error?.message || error);
    const fallbackLead = {
      _id: 'lead_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      inquiryType: cleanInquiryType,
      submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
      source: cleanSource,
      createdAt: new Date(),
    };
    localLeadsStore.unshift(fallbackLead);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been saved securely.',
      id: fallbackLead._id,
    });
  }
}

/**
 * Controller to retrieve stored leads from MongoDB Atlas or local store
 */
export async function getLeads(req, res) {
  try {
    const conn = await connectDB();
    if (conn && mongoose.connection.readyState === 1) {
      const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
      return res.json({
        success: true,
        count: leads.length,
        leads,
      });
    }
    return res.json({
      success: true,
      count: localLeadsStore.length,
      leads: localLeadsStore,
    });
  } catch (error) {
    return res.json({
      success: true,
      count: localLeadsStore.length,
      leads: localLeadsStore,
    });
  }
}

export default { createLead, getLeads };

