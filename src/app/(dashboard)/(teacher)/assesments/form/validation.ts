import * as z from 'zod';

export const createSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Judul harus memiliki minimal 2 karakter' })
        .nonempty({ message: 'Judul tidak boleh kosong' }),
});

export const updateSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Judul harus memiliki minimal 2 karakter' })
        .optional(),
});
