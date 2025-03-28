import { z } from "zod";

export const createCabinFormFields = z.object({
    name: z.string()
        .min(1, { message: 'Cabin name is required' }),
    maxCapacity: z.number()
        .min(1, { message: 'Capacity must be at least 1' }),
    regularPrice: z.number()
        .min(1, { message: 'Regular price must be at least 1' }),
    discount: z.number()
        .min(1, { message: 'Discount must be at least 1' }),
    description: z.string()
        .min(1, { message: 'Description is required' })
        .min(10, { message: 'Description must be at least 10 characters long.' }),
})