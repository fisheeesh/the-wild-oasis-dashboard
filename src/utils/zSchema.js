import { z } from "zod";

export const loginFormFields = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: 'Invalid format.' }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
})

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
    image: z.any().optional(),
    editImage: z.any().optional()
}).superRefine((data, ctx) => {
    const isEdit = !!data.editImage || !data.image;
    if (!isEdit) {
        if (!data.image || data.image.length !== 1) {
            ctx.addIssue({
                path: ['image'],
                code: z.ZodIssueCode.custom,
                message: 'Please upload an image'
            });
        } else if (!data.image[0]?.type?.startsWith('image/')) {
            ctx.addIssue({
                path: ['image'],
                code: z.ZodIssueCode.custom,
                message: 'Only image files are allowed'
            });
        }
    }

    if (data.discount > data.regularPrice) {
        ctx.addIssue({
            path: ['discount'],
            code: z.ZodIssueCode.custom,
            message: 'Discount should be less than regular price'
        });
    }
});

export const createUserFormFields = z.object({
    fullName: z.string()
        .min(1, { message: 'Full name is required.' }),
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: 'Invalid format.' }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' }),
    passwordConfirm: z.string()
        .min(1, { message: 'Password confirmation is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
}).superRefine((data, ctx) => {
    // console.log(data, ctx)
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            path: ['passwordConfirm'],
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match.'
        });
    }
})