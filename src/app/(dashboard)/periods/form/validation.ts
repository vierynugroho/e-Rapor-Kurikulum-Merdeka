import * as z from 'zod';

export const createSchema = z.object({
    year: z
        .string()
        .min(4, { message: 'Tahun harus memiliki 4 karakter' })
        .max(4, { message: 'Tahun harus memiliki 4 karakter' })
        .nonempty({ message: 'Tahun tidak boleh kosong' }),
    semester: z.enum(['GANJIL', 'GENAP'], {
        required_error: 'Silakan pilih semester',
    }),
    isActive: z.preprocess(
        value => {
            if (value === 'true' || value === 1) return true;
            if (value === 'false' || value === 0) return false;
            return value;
        },
        z.boolean({ message: 'Silakan pilih status periode' }),
    ),
});

export const updateSchema = z.object({
    year: z
        .string()
        .min(4, { message: 'Judul harus memiliki 4 karakter' })
        .max(4, { message: 'Judul harus memiliki 4 karakter' })
        .optional(),
    semester: z
        .enum(['GANJIL', 'GENAP'], {
            required_error: 'Silakan pilih semester',
        })
        .optional(),
    isActive: z
        .preprocess(
            value => {
                if (value === 'true' || value === 1) return true;
                if (value === 'false' || value === 0) return false;
                return value;
            },
            z.boolean({ message: 'Silakan pilih status periode' }),
        )
        .optional(),
});
