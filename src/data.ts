import { ArtClass, PortfolioItem, Testimonial } from './types';

// Importing generated images to let Vite package them correctly
import mascotUrl from './assets/images/Blue Fox logo.png';
import mascotHeaderUrl from './assets/images/regenerated_image_1782310899144.png';
import mascotFooterUrl from './assets/images/regenerated_image_1782310732246.png';
import heroUrl from './assets/images/blue_fox_classroom_1781743377628.jpg';
import instructorUrl from './assets/images/Instructor_Aryn_Headshot.jpeg';
import portSunset from './assets/images/portfolio_sunset_1781730671514.jpg';
import portClayFox from './assets/images/ladyslipper.jpg';
import portFamilyTree from './assets/images/portfolio_family_tree_1781730696325.jpg';
import portPaintYourPet from './assets/images/assets/paint_your_pet_pug_exact_1784687237907-DWhZCcoG.jpg';
import portBarnQuilt from './assets/images/regenerated_image_1784688888790.jpg';
import portStarrySky from './assets/images/starrysky.jpg';
import classPhotoUrl from './assets/images/ClassWilAnimalsFoxMask.jpg';

import slide1Url from './assets/images/blue_fox_slide1_1781743793417.jpg';
import slide2Url from './assets/images/blue_fox_slide2_1781743806746.jpg';
import slide3Url from './assets/images/blue_fox_slide3_1781743819262.jpg';
import slide4Url from './assets/images/blue_fox_slide4_1781743831601.jpg';
import slide5Url from './assets/images/blue_fox_slide5_1781743842136.jpg';
import slide6Url from './assets/images/blue_fox_slide6_1781743853076.jpg';

export const IMAGES = {
  mascot: mascotUrl,
  mascotHeader: mascotHeaderUrl,
  mascotFooter: mascotFooterUrl,
  hero: classPhotoUrl,
  instructor: instructorUrl,
  portSunset: portSunset,
  portClayFox: portClayFox,
  portFamilyTree: portFamilyTree,
  classPhoto: classPhotoUrl,
  heroSlides: [
    classPhotoUrl
  ]
};

export const CLASSES_DATA: ArtClass[] = [
  {
    id: 'class-2',
    title: 'Barn Quilt Painting',
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults (Ages 18+)',
    medium: 'painting',
    mediumLabel: 'Barn Quilt Painting',
    timeLabel: '1:00 PM - 4:00 PM',
    dateLabel: 'Every Saturday',
    price: 55,
    capacity: 10,
    dotsColor: 'bg-sunset-orange text-white',
    description: 'Learn the beautiful heritage craft of Barn Quilt Painting. Select your geometric pattern, paint with weather-resistant rich exterior acrylics on a durable wooden board, and take home a striking block ready to hang on your wall or porch.',
    isPopular: true,
    externalUrl: 'https://isd1.arux.app/course/677/fy-26-27/barn-quilt-painting-class'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Barn Quilt Classes',
    author: 'faded star design',
    authorAge: 'Faded Star',
    category: 'student',
    categoryLabel: 'Student Work',
    imageUrl: portSunset,
    likes: 42
  },
  {
    id: 'port-2',
    title: 'Drawing Classes',
    author: 'lady slipper in colored pencil',
    authorAge: 'Colored Pencil',
    category: 'family',
    categoryLabel: 'Family Projects',
    imageUrl: portClayFox,
    likes: 89
  },
  {
    id: 'port-3',
    title: 'Acrylic Painting Classes',
    author: 'starry sky',
    authorAge: 'Starry Sky',
    category: 'family',
    categoryLabel: 'Family Projects',
    imageUrl: portStarrySky,
    likes: 71
  },
  {
    id: 'port-4',
    title: 'Paint Your Pet',
    author: 'by Ariana, age 11',
    authorAge: 'Age 11',
    category: 'student',
    categoryLabel: 'Student Work',
    imageUrl: portPaintYourPet,
    likes: 36
  },
  {
    id: 'port-5',
    title: 'Customized Barn Quilt Design',
    author: 'by Diana',
    authorAge: 'Diana',
    category: 'class-ex',
    categoryLabel: 'Class Examples',
    imageUrl: portBarnQuilt,
    likes: 58
  },
  {
    id: 'port-6',
    title: 'Sailor Moon',
    author: 'by Winter, age 13',
    authorAge: 'Age 13',
    category: 'student',
    categoryLabel: 'Student Work',
    imageUrl: portFamilyTree,
    likes: 124
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    text: "My daughter has participated in quite a few Community Education experiences and has generally enjoyed each class to varying degrees. This class was above and beyond positive! She came home each day full of joy. She absolutely loved the teacher and the structure of the class. The activities and environment were top-tier. Thank you for offering such a fun program, and thank you to the teacher for bringing joy to this class!",
    author: 'Parent of Student',
    role: 'Harry Potter Art Camp',
    avatarSeed: 'brenda'
  },
  {
    id: 'test-2',
    text: "I really enjoyed the Monet Water Lilies Class! The instructor explained brush techniques and color mixing; she even left room for you to explore different painting processes, which resulted in an amazing array of creative originals! It was a happy experience that I would gladly do again.",
    author: 'Heather',
    role: 'Blue Fox Student',
    avatarSeed: 'heather'
  },
  {
    id: 'test-3',
    text: "As an educator, I was impressed by the quality of instruction. The class was thoughtfully paced, allowing enough time to learn each step without feeling rushed while keeping everyone engaged from start to finish. Whether you are a beginner or have prior artistic experience, the instruction is designed to help you grow in confidence and leave with a piece you can be proud of. I highly recommend this class to anyone looking for a well-organized, engaging, and rewarding creative experience.",
    author: 'Lori',
    role: 'Professional Educator',
    avatarSeed: 'lori'
  }
];

export const FAQS = [
  {
    q: 'Do I need to bring any materials or purchase paints?',
    a: 'No! Setting up your space should be entirely carefree. We provide all premium watercolors, acrylic canvases, apron protectors, workspace boards, clay, brushes, and refreshments. Just bring yourself and your imagination.'
  },
  {
    q: 'My child is only 4. Can they participate in families and kids projects?',
    a: 'Absolutely! Our family programs welcome all ages. Toddlers enjoy sensory blending and stamp art, while ages 5 to 7 can do minor finger modeling and painting. Aryn leads with supportive attention!'
  },
  {
    q: 'What if I need to cancel my registered session?',
    a: 'Life happens, especially with children! Simply report cancellations inside the user dashboard or shoot us an email up to 24 hours prior to class for a full refund or free rescheduling.'
  },
  {
    q: 'Can we book a private painting party or birthday event with The Blue Fox?',
    a: 'Yes, we love custom gatherings! We host joyful anniversaries, grandmothers retreats, children\'s birthdays, and backyard painting sessions. Hit our contact box below to see open dates.'
  }
];
