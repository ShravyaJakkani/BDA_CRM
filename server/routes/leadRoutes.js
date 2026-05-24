const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead
} = require('../controllers/leadController');

// All routes require authentication
router.use(protect);

// Create Lead
router.post('/', createLead);

// Get All Leads
router.get('/', getLeads);

// Get Single Lead
router.get('/:id', getLead);

// Update Lead
router.put('/:id', updateLead);

// Delete Lead
router.delete('/:id', deleteLead);

module.exports = router;
