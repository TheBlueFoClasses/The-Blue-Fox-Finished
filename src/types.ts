/**
 * Types for The Blue Fox Art Studio
 */

export interface ArtClass {
  id: string;
  title: string;
  instructor: string;
  ageGroup: 'all' | 'kids-family' | 'adults';
  ageLabel: string;
  medium: 'watercolor' | 'painting' | 'clay' | 'mixed-media';
  mediumLabel: string;
  timeLabel: string;
  dateLabel: string;
  price: number;
  capacity: number;
  dotsColor: string; // Tailwind color for tagging accent
  description: string;
  isPopular?: boolean;
  externalUrl?: string;
  location?: string;
  subtitle?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  author: string;
  authorAge?: string;
  category: 'student' | 'class-ex' | 'family';
  categoryLabel: string;
  imageUrl: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  avatarSeed: string;
}

export interface Registration {
  classId: string;
  className: string;
  studentName: string;
  studentEmail: string;
  attendeesCount: number;
  notes?: string;
}
