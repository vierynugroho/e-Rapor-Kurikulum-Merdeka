import * as z from 'zod';

export const updateSchema = z.object({
    sick: z.coerce
        .number()
        .min(0, { message: 'Sakit tidak boleh kurang dari 0' })
        .transform(val => Number(val))
        .optional(),
    permit: z.coerce
        .number()
        .min(0, { message: 'Izin tidak boleh kurang dari 0' })
        .transform(val => Number(val))
        .optional(),
    absent: z.coerce
        .number()
        .min(0, { message: 'Alpha tidak boleh kurang dari 0' })
        .transform(val => Number(val))
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
    classID: z
        .any({
            required_error: 'ID guru tidak boleh kosong',
        })
        .optional(),
});
