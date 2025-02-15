import * as z from 'zod';

export const createSchema = z.object({
    fullname: z.string().min(2, 'Nama harus memiliki minimal 2 karakter'),
    email: z.string().email('Alamat email tidak valid'),
    identity_number: z
        .string()
        .min(8, 'Nomor identitas harus memiliki minimal 8 karakter'),
    password: z.string().min(8, 'Kata sandi harus memiliki minimal 8 karakter'),
    classID: z.any({
        required_error: 'Silakan pilih kelas',
    }),
    role: z.enum(['TEACHER', 'ADMIN'], {
        required_error: 'Silakan pilih peran',
    }),
    position: z.enum(['TEACHER', 'HEADMASTER', 'COMMITTEE'], {
        required_error: 'Silakan pilih peran',
    }),
});

export const updateSchema = z.object({
    fullname: z
        .string()
        .min(2, 'Nama harus memiliki minimal 2 karakter')
        .optional(),
    email: z.string().email('Alamat email tidak valid').optional(),
    identity_number: z
        .string()
        .min(8, 'Nomor identitas harus memiliki minimal 8 karakter')
        .optional(),
    password: z
        .string()
        .min(8, 'Kata sandi harus memiliki minimal 8 karakter')
        .optional(),
    classID: z
        .any({
            required_error: 'Silakan pilih kelas',
        })
        .optional(),
    role: z
        .enum(['TEACHER', 'ADMIN'], {
            required_error: 'Silakan pilih peran',
        })
        .optional(),
    position: z
        .enum(['TEACHER', 'HEADMASTER', 'COMMITTEE'], {
            required_error: 'Silakan pilih peran',
        })
        .optional(),
});
