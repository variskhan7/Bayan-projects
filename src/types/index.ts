export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  sector: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  imageUrl: string;
  gallery?: string[];
  featured?: boolean;
  published: boolean;
  client?: string;
  completionDate?: string;
  scopeOfWork?: string;
  highlights?: string[];
  specifications?: Record<string, string>;
  createdAt?: any;
}

export interface Sector {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview?: string;
  imageUrl: string;
  bannerUrl?: string;
  published: boolean;
  highlights?: string[];
  capabilities?: string[];
  createdAt?: any;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  bannerUrl?: string;
  features?: string[];
  deliverables?: string[];
  published: boolean;
  createdAt?: any;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string;
  published: boolean;
  publishedAt: string;
  author?: string;
  readTime?: string;
  createdAt?: any;
}

export interface Enquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: any;
}

export interface JobOpening {
  id: string;
  title: string;
  slug: string;
  location: string;
  department: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  published?: boolean;
  postedDate?: string;
}

export interface JobApplication {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  introduction: string;
  createdAt?: any;
}
