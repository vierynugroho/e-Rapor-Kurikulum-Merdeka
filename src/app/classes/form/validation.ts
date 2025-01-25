import * as z from 'zod';

export const createSchema = z.object({
    name: z.string().min(2),
});

export const updateSchema = z.object({
    name: z.string().min(2).optional(),
});
