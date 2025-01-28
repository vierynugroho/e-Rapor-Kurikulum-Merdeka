import * as z from 'zod';

export const createSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Judul harus memiliki minimal 2 karakter' })
        .nonempty({ message: 'Judul tidak boleh kosong' }),
    description: z
        .string()
        .min(5, { message: 'Deskripsi harus memiliki minimal 5 karakter' })
        .nonempty({ message: 'Deskripsi tidak boleh kosong' }),
    assesment_type: z.enum(
        [
            'NILAI_AGAMA_DAN_BUDI_PEKERTI',
            'JATI_DIRI',
            'DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI',
        ],
        {
            required_error: 'Silakan pilih tipe assesmen',
        },
    ),
    themeID: z.any({
        required_error: 'Silakan pilih tema',
    }),
});

export const updateSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Judul harus memiliki minimal 2 karakter' })
        .optional(),
    description: z
        .string()
        .min(5, { message: 'Deskripsi harus memiliki minimal 5 karakter' })
        .nonempty({ message: 'Deskripsi tidak boleh kosong' })
        .optional(),
    assesment_type: z
        .enum(
            [
                'NILAI_AGAMA_DAN_BUDI_PEKERTI',
                'JATI_DIRI',
                'DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI',
            ],
            {
                required_error: 'Silakan pilih tipe assesmen',
            },
        )
        .optional(),
    themeID: z
        .any({
            required_error: 'Silakan pilih tema',
        })
        .optional(),
});
