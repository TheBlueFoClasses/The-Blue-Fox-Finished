import bq1 from '../assets/images/barnquilt_friendshipstar.jpg';
import bq2 from '../assets/images/barnquilt_flag.jpg';
import bq3 from '../assets/images/barnquilt_hiddencross.jpg';
import bq4 from '../assets/images/barnquilt_tulips.jpg';
import bq5 from '../assets/images/barnquilt_bluejay.jpg';
import bq6 from '../assets/images/barnquilt_fadedstar.jpg';
import bq7 from '../assets/images/barnquilt_bluecross.jpg';
import bq8 from '../assets/images/barnquilt_pinwheel.jpg';
import bq9 from '../assets/images/barnquilt_cardinal.jpg';

export interface BarnQuiltDesign {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  imageUrl: string;
  sizeOption: string;
  colorPalette: string[];
}

export const BARN_QUILT_DESIGNS: BarnQuiltDesign[] = [
  {
    id: 'bq-1',
    title: 'Friendship Star',
    category: 'Classic Star',
    difficulty: 'Beginner Friendly',
    description: 'A rustic geometric eight-point star painted in weathered white, slate gray, taupe, and deep timber tones on wooden planks.',
    imageUrl: bq1,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Slate Gray', 'Weathered White', 'Rustic Taupe']
  },
  {
    id: 'bq-2',
    title: 'American Flag',
    category: 'Patriotic Heritage',
    difficulty: 'Beginner Friendly',
    description: 'A patriotic barn quilt block displaying vibrant red, white, and blue geometric stars and stripes.',
    imageUrl: bq2,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Patriotic Red', 'Pure White', 'Deep Cobalt']
  },
  {
    id: 'bq-3',
    title: 'Hidden Cross',
    category: 'Traditional Geometric',
    difficulty: 'Intermediate',
    description: 'An intricate interlocking geometric block with rich teal, terracotta, and soft cream revealing a hidden cross motif.',
    imageUrl: bq3,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Deep Teal', 'Terracotta Rust', 'Soft Cream']
  },
  {
    id: 'bq-4',
    title: 'Tulips',
    category: 'Floral Geometric',
    difficulty: 'Beginner Friendly',
    description: 'A charming floral barn quilt pattern featuring vibrant red and pink stylized tulips with rich green leaf accents.',
    imageUrl: bq4,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Crimson Red', 'Tulip Pink', 'Meadow Green']
  },
  {
    id: 'bq-5',
    title: 'Blue Jay',
    category: 'Nature & Birds',
    difficulty: 'Beginner Friendly',
    description: 'A stylized geometric bird block inspired by the bold sky blue, royal navy, and pure white plumage of the Blue Jay.',
    imageUrl: bq5,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Sky Blue', 'Royal Navy', 'Snow White']
  },
  {
    id: 'bq-6',
    title: 'Faded Star',
    category: 'Vintage Star',
    difficulty: 'Beginner Friendly',
    description: 'A soft vintage star block with muted pastel slate blue, sage green, and warm cream points.',
    imageUrl: bq6,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Slate Blue', 'Muted Sage', 'Warm Cream']
  },
  {
    id: 'bq-7',
    title: 'Blue Cross',
    category: 'Classic Geometric',
    difficulty: 'Intermediate',
    description: 'A striking geometric cross pattern featuring clean lines in vibrant royal blue, crisp white, and navy accents.',
    imageUrl: bq7,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Royal Blue', 'Navy Indigo', 'Crisp White']
  },
  {
    id: 'bq-8',
    title: 'Pinwheel',
    category: 'Rotating Geometry',
    difficulty: 'Beginner Friendly',
    description: 'A playful rotating pinwheel pattern with high-contrast primary colors designed to create dynamic movement.',
    imageUrl: bq8,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Primary Red', 'Ocean Blue', 'Sunny Yellow']
  },
  {
    id: 'bq-9',
    title: 'Cardinal',
    category: 'Nature & Birds',
    difficulty: 'Intermediate',
    description: 'A vibrant crimson cardinal bird stylized into a striking geometric wooden barn quilt block.',
    imageUrl: bq9,
    sizeOption: '2ft x 2ft Wooden Board',
    colorPalette: ['Crimson Red', 'Forest Green', 'Pure White']
  }
];

