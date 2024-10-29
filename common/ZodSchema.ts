import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const imageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  file_size: z.number().int(),
});

export const sharedImageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  imageId: z.string(),
  userId: z.string(),
});

// Schemas with relations
export const userWithRelationsSchema = userSchema.extend({
  SharedImages: z.array(sharedImageSchema),
  Images: z.array(imageSchema),
});

export const imageWithRelationsSchema = imageSchema.extend({
  user: userSchema,
  SharedImages: z.array(sharedImageSchema),
});

export const sharedImageWithRelationsSchema = sharedImageSchema.extend({
  image: imageSchema,
  user: userSchema,
});

export const uploadImagetoDBSchema = imageSchema.pick({
  id: true,
  userId: true,
});

export const uploadImagetoS3Schema = z.union([
  imageSchema.pick({ userId: true }),
  z.object({ file: z.instanceof(File) }),
]);
