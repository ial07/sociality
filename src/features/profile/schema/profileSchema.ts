import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(), 
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  
  avatar: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;