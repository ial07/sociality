import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .custom<FileList>()
  .refine((files) => files.length > 0, "Image is required.")
  .refine((files) => files?.[0]?.size <= 5000000, `Max image size is 5MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const newPostSchema = z.object({
  image: fileSchema,

  caption: z
    .string()
    .trim()
    .min(2, "Captions must be at least 2 characters")
    .max(500, "Caption cannot exceed 500 characters.")
    .optional(),
});

export type NewPostFormValues = z.infer<typeof newPostSchema>;
