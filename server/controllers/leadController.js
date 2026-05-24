const Lead = require('../models/Lead');
const User = require('../models/User');

// Create Lead
const createLead = async (req, res) => {
  try {
    const { leadName, company, email, phone, status, notes } = req.body;

    const lead = await Lead.create({
      leadName,
      company,
      email,
      phone,
      status: status || 'New',
      notes,
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: 'Lead created successfully',
      lead
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Lead
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Lead
const updateLead = async (req, res) => {
  try {
    const { leadName, company, email, phone, status, notes } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Get user with role
    const user = await User.findById(req.user.userId);
    
    // Check permission: allow if creator OR manager OR admin
    if (lead.createdBy.toString() !== req.user.userId && user.role !== 'manager' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: You can only edit your own leads' });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { leadName, company, email, phone, status, notes },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Lead updated successfully',
      lead: updatedLead
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Get user with role
    const user = await User.findById(req.user.userId);
    
    // Check permission: allow only if manager OR admin
    if (user.role !== 'manager' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only managers and admins can delete leads' });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead
};
