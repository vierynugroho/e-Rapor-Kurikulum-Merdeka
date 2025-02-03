import * as z from 'zod';

export const createSchema = z.object({
    fullname: z.string().min(2, 'Nama harus memiliki minimal 2 karakter'),
    religion: z.enum(
        ['ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'BUDDHA', 'HINDU'],
        {
            required_error: 'Silakan pilih agama',
        },
    ),
    parentName: z
        .string()
        .min(2, 'Nama wali murid harus memiliki minimal 2 karakter'),
    address: z.string().min(2, 'Silahkan pilih alamat anda'),
    birthPlace: z
        .string()
        .min(2, 'Tempat lahir harus memiliki minimal 2 karakter'),
    birthDate: z.union([
        // Menerima objek Date
        z.date(),
        // Menerima string ISO
        z.string().refine(
            value => {
                const date = new Date(value);
                return !isNaN(date.getTime());
            },
            {
                message: 'Format tanggal tidak valid',
            },
        ),
    ]),
    gender: z.enum(['LAKI_LAKI', 'PEREMPUAN'], {
        required_error: 'Silakan pilih jenis kelamin',
    }),
    classID: z.any({
        required_error: 'Silakan pilih kelas',
    }),
});

export const updateSchema = z.object({
    fullname: z
        .string()
        .min(2, 'Nama harus memiliki minimal 2 karakter')
        .optional(),
    religion: z
        .enum(['ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'BUDDHA', 'HINDU'], {
            required_error: 'Silakan pilih agama',
        })
        .optional(),
    parentName: z
        .string()
        .min(2, 'Nama wali murid harus memiliki minimal 2 karakter')
        .optional(),
    address: z.string().min(2, 'Silahkan pilih alamat anda').optional(),
    birthPlace: z
        .string()
        .min(2, 'Tempat lahir harus memiliki minimal 2 karakter')
        .optional(),
    birthDate: z
        .union([
            // Menerima objek Date
            z.date(),
            // Menerima string ISO
            z.string().refine(
                value => {
                    const date = new Date(value);
                    return !isNaN(date.getTime());
                },
                {
                    message: 'Format tanggal tidak valid',
                },
            ),
        ])
        .optional(),
    classID: z
        .any({
            required_error: 'Silakan pilih kelas',
        })
        .optional(),
    gender: z
        .enum(['LAKI_LAKI', 'PEREMPUAN'], {
            required_error: 'Silakan pilih jenis kelamin',
        })
        .optional(),
});
