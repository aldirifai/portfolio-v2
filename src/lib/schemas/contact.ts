import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or fewer"),
  email: z.string().email("Please enter a valid email"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(4000, "Message must be 4000 characters or fewer"),
  // Honeypot — humans never fill this; bots fill all visible fields.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
