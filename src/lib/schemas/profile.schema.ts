import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "validation.name_min_length"),
  email: z.string().email("validation.invalid_email"),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
