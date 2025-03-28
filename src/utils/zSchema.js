import { z } from "zod";

export const createCabinFormFields = z.object({
    name: z.string()
        .min(1, { message: 'Cabin name is required' }),
    maxCapacity: z.number()
        .min(1, { message: 'Capacity must be at least 1' }),
    regularPrice: z.number()
        .min(1, { message: 'Regular price must be at least 1' }),
    discount: z.number().optional(),
    description: z.string()
        .min(1, { message: 'Description is required' })
        .min(10, { message: 'Description must be at least 10 characters long.' }),
    image: z.any()
        .refine(file => file?.length === 1, { message: 'Please upload an image' })
        .refine(file => file[0]?.type?.startsWith('image/'), { message: "Only image files are allowed" })
}).refine(data => data.discount <= data.regularPrice, {
    message: "Discount should be less than regular price",
    path: ['discount']
})