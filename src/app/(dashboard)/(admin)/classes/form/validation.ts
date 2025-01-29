import * as z from 'zod';

export const createSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Nama harus memiliki minimal 2 karakter' })
        .nonempty({ message: 'Nama tidak boleh kosong' }),
});

export const updateSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Nama harus memiliki minimal 2 karakter' })
        .optional(),
});
