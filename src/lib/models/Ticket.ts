import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  userEmail: {
    type: String,
    required: [true, 'Please provide user email'],
    trim: true,
    lowercase: true
  },
  userName: {
    type: String,
    required: [true, 'Please provide user name'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  category: {
    type: String,
    enum: ['technical', 'billing', 'general', 'feature-request'],
    default: 'general'
  },
  resolution: {
    type: String,
    default: ''
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  resolvedBy: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
ticketSchema.index({ userEmail: 1, status: 1 });
ticketSchema.index({ status: 1, priority: 1 });

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);