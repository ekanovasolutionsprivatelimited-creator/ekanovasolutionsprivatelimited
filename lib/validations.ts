import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email address').max(255),
  phone: z.string().min(7, 'Phone number is too short').max(20),
  college: z.string().min(2, 'College name is required').max(120),
  projectType: z.string().min(2, 'Project type is required').max(120),
  service: z.string().min(2, 'Please select a service').max(120),
  budget: z.string().min(1, 'Budget is required').max(50),
  message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
  website: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

