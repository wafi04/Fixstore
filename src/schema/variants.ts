import { z } from "zod";

// Zod schema for InventoryForm
export const InventoryFormSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
  stock: z
    .number()
    .int()
    .min(0, { message: "Stock must be a non-negative number" }),
  availableStock: z
    .number()
    .int()
    .min(0, { message: "Available stock must be a non-negative number" }),
});

// Zod schema for VariantsForm
export const VariantsFormSchema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" }),
  inventory: z
    .array(InventoryFormSchema)
    .min(1, { message: "At least one inventory entry is required" }),
});

export type VariantsForm = z.infer<typeof VariantsFormSchema>;
