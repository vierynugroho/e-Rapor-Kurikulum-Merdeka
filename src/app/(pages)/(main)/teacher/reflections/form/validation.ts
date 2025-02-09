import * as z from 'zod';

export const updateSchema = z.object({
    description: z
        .string()
        .min(5, { message: 'Deskripsi harus memiliki minimal 5 karakter' })
        .nonempty({ message: 'Deskripsi tidak boleh kosong' })
        .optional(),
    studentId: z
        .any({
            required_error: 'Data siswa bernilai kosong',
        })
        .optional(),
    teacherId: z
        .any({
            required_error: 'Data guru bernilai kosong',
        })
        .optional(),
    periodId: z
        .any({
            required_error: 'Data periode bernilai kosong',
        })
        .optional(),
    classId: z
        .any({
            required_error: 'Data kelas bernilai kosong',
        })
        .optional(),
});
