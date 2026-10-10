import { z } from 'zod';
export const EnquirySchema = z.object({
  adventure: z.string().min(1),
  days: z.number().int().min(2).max(21),
  experience: z.string().min(1),
  destinations: z.array(z.string()).min(1).max(12),
  motorcycle: z.string().min(1),
  date: z.string().optional().default(''),
  flexible: z.boolean(),
  riders: z.number().int().min(1).max(20),
  passengers: z.number().int().min(0).max(20),
  group: z.enum(['Private', 'Join a group']),
  accommodation: z.string().min(1),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).regex(/^[+()\d\s-]*$/, 'Use digits, spaces and + only').optional().default(''),
  country: z.string().trim().min(1).max(80),
  notes: z.string().max(4000).optional().default(''),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
  company_website: z.string().optional().default(''), // honeypot
});
export type Enquiry = z.infer<typeof EnquirySchema>;
