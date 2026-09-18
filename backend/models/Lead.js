import mongoose from 'mongoose';

/**
 * Submission / Lead Schema for saving customer contact & event inquiry form submissions
 * stored directly in the 'submissions' collection of the 'the_blue_fox' database.
 */
const submissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    subject: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    inquiryType: {
      type: String,
      default: 'general',
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      default: 'contact_form',
    },
  },
  {
    collection: 'submissions', // Explicitly map to 'submissions' collection in the_blue_fox
    timestamps: true,
  }
);

// Prevent re-compilation model error in dev mode
export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema, 'submissions');
export const Lead = mongoose.models.Lead || mongoose.model('Lead', submissionSchema, 'submissions');

export default Submission;
