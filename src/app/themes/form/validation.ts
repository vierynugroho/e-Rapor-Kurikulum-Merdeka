import * as z from 'zod';

export const createSchema = z.object({
    title: z.string().min(2),
});

export const updateSchema = z.object({
    title: z.string().min(2).optional(),
});
