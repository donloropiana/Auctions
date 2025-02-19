import { z } from "zod";

// Enum validation matching the database enums
const categoryEnum = z.enum(["wine", "spirit"]);
const statusEnum = z.enum(["upcoming", "active", "sold", "unsold"]);

// Base listing schema matching the main listings table
export const listingSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string(),
  category: categoryEnum,
  volume_ml: z.number().positive(),
  start_date_time: z.string().datetime(),
  end_date_time: z.string().datetime(),
  folder_path: z.string(),
  
  // Price IDs (these will be generated when prices are created)
  start_price_id: z.number(),
  reserve_price_id: z.number(),
  current_price_id: z.number(),

  // Add these two fields
  start_price: z.number().positive(),
  reserve_price: z.number().positive().optional(),

  // Optional fields
  status: statusEnum.optional(),
  buyer_id: z.string().uuid().optional().nullable(),
  seller_id: z.string().uuid(),
  updated_at: z.string().datetime().optional().nullable(),
});

// Additional schema for wine-specific fields
export const wineListingSchema = listingSchema.extend({
  category: z.literal("wine"),
  wine_details: z.object({
    vintage: z.number().min(1800).max(new Date().getFullYear()),
    varietal: z.string().min(1),
    region: z.string().min(1),
  }),
});

// Additional schema for spirit-specific fields
export const spiritListingSchema = listingSchema.extend({
  category: z.literal("spirit"),
  spirit_details: z.object({
    age: z.number().min(0),
    proof: z.number().positive(),
    subcategory: z.string().min(1),
  }),
});

// Combined schema that can validate either type
export const combinedListingSchema = z.discriminatedUnion("category", [
  wineListingSchema,
  spiritListingSchema,
]);

// Form-specific schema (client-side)
export const listingFormSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string(),
  category: z.enum(["wine", "spirit"]),
  volume_ml: z.number().positive(),
  start_date_time: z.string().datetime(),
  end_date_time: z.string().datetime(),
  start_price: z.number().positive(),
  reserve_price: z.number().positive().optional(),
  status: z.enum(["upcoming", "active", "sold", "unsold"]).optional(),
  wine_details: z.object({
    vintage: z.number(),
    varietal: z.string(),
    region: z.string(),
  }).optional(),
  spirit_details: z.object({
    age: z.number().min(0),
    proof: z.number().positive(),
    subcategory: z.string().min(1),
  }).optional(),
}).refine(
  (data) => {
    if (data.category === 'wine') {
      return data.wine_details !== undefined;
    } else {
      return data.spirit_details !== undefined;
    }
  },
  {
    message: "Wine details required for wine category, spirit details required for spirit category",
  }
);