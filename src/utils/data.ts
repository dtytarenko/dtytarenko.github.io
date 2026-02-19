import { PortfolioItem, Technology } from '../types';

// Import images
import giftcardsImg from '../assets/images/giftcards.jpg';
import dinercadeauImg from '../assets/images/dinercadeau.jpg';
import ccImg from '../assets/images/cc.jpg';
import cadeaubonImg from '../assets/images/cadeaubon.jpg';
import aauImg from '../assets/images/aau.jpg';

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: 'Giftcards.nl',
    description: 'E-commerce site based on Drupal with 200,000+ unique visitors per month for Cadeau Concepten NL (Amsterdam)',
    image: giftcardsImg,
    url: 'http://giftcards.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'Drupal']
  },
  {
    id: 2,
    title: 'Dinercadeau.nl',
    description: 'E-commerce site based on Drupal for Cadeau Concepten NL (Amsterdam)',
    image: dinercadeauImg,
    url: 'https://www.diner-cadeau.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'Drupal']
  },
  {
    id: 3,
    title: 'Cadeauconcepten.nl',
    description: 'Landing-page for Cadeau Concepten NL (Amsterdam)',
    image: ccImg,
    url: 'https://www.cadeauconcepten.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp']
  },
  {
    id: 4,
    title: 'Cadeaubon.nl',
    description: 'E-commerce site based on Drupal for Cadeau Concepten NL (Amsterdam)',
    image: cadeaubonImg,
    url: 'https://www.cadeaubon.nl/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'Drupal']
  },
  {
    id: 5,
    title: 'UAA',
    description: 'Website for Association of Advocates of Ukraine',
    image: aauImg,
    url: 'https://www.uaa.org.ua/',
    technologies: ['HTML5', 'CSS3', 'Stylus', 'JavaScript', 'Gulp', 'October CMS']
  }
];

export const technologiesData: Technology[] = [
  // Frontend
  { id: 1, name: 'HTML5', icon: 'html5', category: 'frontend' },
  { id: 2, name: 'CSS3', icon: 'css', category: 'frontend' },
  { id: 3, name: 'JavaScript', icon: 'javascript', category: 'frontend' },
  { id: 4, name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { id: 5, name: 'React', icon: 'react', category: 'frontend' },
  { id: 6, name: 'Next.js', icon: 'nextdotjs', category: 'frontend' },
  { id: 7, name: 'Vue.js', icon: 'vuedotjs', category: 'frontend' },
  { id: 8, name: 'Redux', icon: 'redux', category: 'frontend' },
  { id: 9, name: 'GraphQL', icon: 'graphql', category: 'frontend' },
  { id: 10, name: 'Sass', icon: 'sass', category: 'frontend' },
  { id: 11, name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend' },
  { id: 12, name: 'Bootstrap', icon: 'bootstrap', category: 'frontend' },
  { id: 13, name: 'jQuery', icon: 'jquery', category: 'frontend' },

  // Backend & Databases
  { id: 14, name: 'Node.js', icon: 'nodedotjs', category: 'backend' },
  { id: 15, name: 'PHP', icon: 'php', category: 'backend' },
  { id: 16, name: 'MongoDB', icon: 'mongodb', category: 'backend' },
  { id: 17, name: 'MySQL', icon: 'mysql', category: 'backend' },
  { id: 18, name: 'WordPress', icon: 'wordpress', category: 'backend' },
  { id: 19, name: 'WooCommerce', icon: 'woocommerce', category: 'backend' },
  { id: 20, name: 'Drupal', icon: 'drupal', category: 'backend' },
  { id: 21, name: 'Shopware', icon: 'shopware', category: 'backend' },

  // DevOps & Tools
  { id: 22, name: 'Git', icon: 'git', category: 'tools' },
  { id: 23, name: 'Docker', icon: 'docker', category: 'tools' },
  { id: 24, name: 'Webpack', icon: 'webpack', category: 'tools' },
  { id: 25, name: 'Figma', icon: 'figma', category: 'tools' },

  // Marketing & Analytics
  { id: 26, name: 'Google Analytics', icon: 'googleanalytics', category: 'marketing' },
  { id: 27, name: 'Google Tag Manager', icon: 'googletagmanager', category: 'marketing' },
  { id: 28, name: 'Meta Pixel', icon: 'meta', category: 'marketing' }
];
