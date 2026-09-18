import express from 'express';
import { generateContent } from '../controllers/geminiController.js';

const router = express.Router();

// POST /api/gemini/generate - Generate text using Gemini AI
router.post('/generate', generateContent);

export default router;
