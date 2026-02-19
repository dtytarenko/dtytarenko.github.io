export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

export interface Technology {
  id: number;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'marketing';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
