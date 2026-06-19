export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  image?: string;
  category: string;
  slug: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  category: string;
  image?: string;
}

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  commission?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'other';
  date: string;
  category: string;
  size?: string;
}

export interface Association {
  id: string;
  name: string;
  description: string;
  contact?: string;
  email?: string;
  website?: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface QuickLink {
  icon: string;
  label: string;
  href: string;
  description?: string;
}
