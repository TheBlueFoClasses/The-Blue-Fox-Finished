import express from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';

const router = express.Router();

// POST /api/leads - Create a new lead
router.post('/', createLead);

// GET /api/leads - Retrieve stored leads
router.get('/', getLeads);

export default router;
