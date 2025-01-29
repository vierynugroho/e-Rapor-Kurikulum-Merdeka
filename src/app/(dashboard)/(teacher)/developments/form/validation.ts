import * as z from 'zod';

export const createSchema = z.object({
    height: z.coerce
        .number()
        .min(0, { message: 'Tinggi badan tidak boleh kurang dari 0' })
        .transform(val => Number(val)),
    weight: z.coerce
        .number()
        .min(0, { message: 'Berat badan tidak boleh kurang dari 0' })
        .transform(val => Number(val)),
    notes: z
        .string()
        .min(5, { message: 'Deskripsi harus memiliki minimal 5 karakter' })
        .nonempty({ message: 'Deskripsi tidak boleh kosong' }),
    studentID: z.any({
        required_error: 'ID siswa tidak boleh kosong',
    }),
    teacherID: z.any({
        required_error: 'ID guru tidak boleh kosong',
    }),
});

export const updateSchema = z.object({
    height: z.coerce
        .number()
        .min(0, { message: 'Tinggi badan tidak boleh kurang dari 0' })
        .transform(val => Number(val))
        .optional(),
    weight: z.coerce
        .number()
        .min(0, { message: 'Berat badan tidak boleh kurang dari 0' })
        .transform(val => Number(val))
        .optional(),
    notes: z
        .string()
        .min(5, { message: 'Deskripsi harus memiliki minimal 5 karakter' })
        .nonempty({ message: 'Deskripsi tidak boleh kosong' })
        .optional(),
    studentID: z
        .any({
            required_error: 'ID siswa tidak boleh kosong',
        })
        .optional(),
    teacherID: z
        .any({
            required_error: 'ID guru tidak boleh kosong',
        })
        .optional(),
});
