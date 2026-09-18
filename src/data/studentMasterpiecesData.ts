import portPaintYourPet from '../assets/images/assets/paint_your_pet_pug_exact_1784687237907-DWhZCcoG.jpg';
import portFamilyTree from '../assets/images/portfolio_family_tree_1781730696325.jpg';
import portClayFox from '../assets/images/ladyslipper.jpg';
import portStarrySky from '../assets/images/starrysky.jpg';
import portBarnQuilt from '../assets/images/regenerated_image_1784688888790.jpg';
import portFoxSculpt from '../assets/images/portfolio_fox_clay_1781730684818.jpg';
import portWildAnimals from '../assets/images/ClassWilAnimalsFoxMask.jpg';
import bq5 from '../assets/images/barnquilt_bluejay.jpg';
import bq4 from '../assets/images/barnquilt_tulips.jpg';

export interface StudentMasterpiece {
  id: string;
  title: string;
  artist: string;
  medium: string;
  category: string;
  description: string;
  imageUrl: string;
  details?: string;
}

export const STUDENT_MASTERPIECES: StudentMasterpiece[] = [
  {
    id: 'sm-1',
    title: 'Paint Your Pet (Pug Portrait)',
    artist: 'by Ariana, age 11',
    medium: 'Acrylic Painting',
    category: 'Youth Art',
    description: 'A charming, high-contrast acrylic portrait of a beloved pug created during our popular Paint Your Pet workshop.',
    imageUrl: portPaintYourPet,
    details: 'Completed in a single 2.5-hour workshop with step-by-step color layering and fine brush accent guidance.'
  },
  {
    id: 'sm-2',
    title: 'Sailor Moon & Anime Character Art',
    artist: 'by Winter, age 13',
    medium: 'Drawing & Illustration',
    category: 'Youth Art',
    description: 'Vibrant, detailed character drawing highlighting expressive eyes, dynamic line art, and rich color shading.',
    imageUrl: portFamilyTree,
    details: 'Created during our Youth Anime & Illustration Workshop focusing on proportions, linework, and marker blending.'
  },
  {
    id: 'sm-3',
    title: 'Lady Slipper in Colored Pencil',
    artist: 'by Lori',
    medium: 'Colored Pencil Drawing',
    category: 'Adult Drawing',
    description: 'An exquisite botanical study of Minnesota’s state flower featuring delicate pressure blending and realistic shading.',
    imageUrl: portClayFox,
    details: 'Created in our Adult Drawing & Botanical Illustration class using professional lightfast colored pencils.'
  },
  {
    id: 'sm-4',
    title: 'Starry Sky & Pine Silhouette',
    artist: 'by Student Artist',
    medium: 'Acrylic on Canvas',
    category: 'Adult Painting',
    description: 'An atmospheric night sky canvas with rich indigo and cerulean blends offset by crisp evergreen silhouettes.',
    imageUrl: portStarrySky,
    details: 'Painted during an evening acrylic landscape class focusing on wet-on-wet color blending techniques.'
  },
  {
    id: 'sm-5',
    title: 'Customized Barn Quilt Design',
    artist: 'by Diana',
    medium: 'Barn Quilt Painting',
    category: 'Barn Quilt',
    description: 'A striking geometric quilt block painted on reclaimed Minnesota barnwood with personalized color palettes.',
    imageUrl: portBarnQuilt,
    details: 'Hand-crafted on a 2x2ft reclaimed wooden pallet board with weather-sealed acrylic outdoor paints.'
  },
  {
    id: 'sm-6',
    title: 'Sculpted Clay Fox & Wildlife Mask',
    artist: 'by Youth Workshop Student',
    medium: 'Clay & Mixed Media',
    category: 'Youth Art & Clay',
    description: 'Tactile 3D clay fox sculpture and hand-painted wild animal mask created in our summer youth art camp.',
    imageUrl: portFoxSculpt,
    details: 'Sculpted from air-dry clay, hand-painted with acrylics, and sealed for a gloss finish.'
  },
  {
    id: 'sm-7',
    title: 'Wild Animals Fox Mask Workshop',
    artist: 'by Youth Camp Student',
    medium: 'Paper Mâché & Acrylic',
    category: 'Youth Camp',
    description: 'Vibrant wearable fox mask handcrafted with custom ear shapes, whisker details, and bold orange fur patterns.',
    imageUrl: portWildAnimals,
    details: 'Crafted during Wild Animals Week in our Blue Fox Summer Creative Camp.'
  },
  {
    id: 'sm-8',
    title: 'Blue Jay Barn Quilt Block',
    artist: 'by Heather',
    medium: 'Barn Quilt Painting',
    category: 'Barn Quilt',
    description: 'Geometric bird pattern painted with sky blue, royal navy, and pure white geometric angles.',
    imageUrl: bq5,
    details: 'Created in a Saturday Barn Quilt Workshop. Inspired by Minnesota native songbirds.'
  },
  {
    id: 'sm-9',
    title: 'Tulip Harvest Wooden Board',
    artist: 'by Suzanne',
    medium: 'Barn Quilt Painting',
    category: 'Barn Quilt',
    description: 'Charming floral geometric block featuring crimson red and tulip pink petals with meadow green leaves.',
    imageUrl: bq4,
    details: 'Precision taped and hand-painted on reclaimed barnwood planks.'
  }
];
