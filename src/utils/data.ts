import { PortfolioItem, Technology } from '../types';

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: 'Giftcards.nl',
    description: 'E-commerce site based on Drupal with 200,000+ unique visitors per month for Cadeau Concepten NL (Amsterdam)',
    image: '/src/assets/images/giftcards.jpg',
    url: 'http://giftcards.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'Drupal']
  },
  {
    id: 2,
    title: 'Dinercadeau.nl',
    description: 'E-commerce site based on Drupal for Cadeau Concepten NL (Amsterdam)',
    image: '/src/assets/images/dinercadeau.jpg',
    url: 'https://www.diner-cadeau.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'Drupal']
  },
  {
    id: 3,
    title: 'Cadeauconcepten.nl',
    description: 'Landing-page for Cadeau Concepten NL (Amsterdam)',
    image: '/src/assets/images/cc.jpg',
    url: 'https://www.cadeauconcepten.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp']
  },
  {
    id: 4,
    title: 'Cadeaubon.nl',
    description: 'E-commerce site based on Drupal for Cadeau Concepten NL (Amsterdam)',
    image: '/src/assets/images/cadeaubon.jpg',
    url: 'https://www.cadeaubon.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'Drupal']
  },
  {
    id: 5,
    title: 'UAA',
    description: 'Website for Association of Advocates of Ukraine',
    image: '/src/assets/images/aau.jpg',
    url: 'https://www.uaa.org.ua/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'October CMS']
  }
];

export const technologiesData: Technology[] = [
  // Frontend
  { id: 1, name: 'HTML', icon: 'html', category: 'frontend' },
  { id: 2, name: 'CSS', icon: 'css', category: 'frontend' },
  { id: 3, name: 'JavaScript', icon: 'js', category: 'frontend' },
  { id: 4, name: 'React', icon: 'react', category: 'frontend' },
  { id: 5, name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { id: 6, name: 'Three.js', icon: 'threejs', category: 'frontend' },

  // CSS Preprocessors
  { id: 7, name: 'SASS', icon: 'sass', category: 'frontend' },
  { id: 8, name: 'Less', icon: 'less', category: 'frontend' },
  { id: 9, name: 'Stylus', icon: 'stylus', category: 'frontend' },

  // Build Tools
  { id: 10, name: 'Gulp', icon: 'gulp', category: 'tools' },
  { id: 11, name: 'Webpack', icon: 'webpack', category: 'tools' },
  { id: 12, name: 'Vite', icon: 'vite', category: 'tools' },

  // CMS & Backend
  { id: 13, name: 'Drupal', icon: 'drupal', category: 'backend' },
  { id: 14, name: 'WordPress', icon: 'wp', category: 'backend' },

  // Other Tools
  { id: 15, name: 'Git', icon: 'git', category: 'tools' },
  { id: 16, name: 'npm', icon: 'npm', category: 'tools' },
  { id: 17, name: 'jQuery', icon: 'jquery', category: 'frontend' },
  { id: 18, name: 'Bootstrap', icon: 'bootstrap', category: 'frontend' },

  // Design
  { id: 19, name: 'Figma', icon: 'figma', category: 'design' },
  { id: 20, name: 'Photoshop', icon: 'ps', category: 'design' }
];
