export type EnquiryStatus = 'new' | 'contacted' | 'closed';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  project_type: string;
  service: string;
  budget: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  created_at: string;
}

