import * as z from 'zod';

// Enum untuk aspek
export const AspectEnum = z
    .enum([
        'JATI_DIRI',
        'DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI',
        'NILAI_AGAMA_DAN_BUDI_PEKERTI',
    ])
    .optional();

// Enum untuk nilai
export const DevelopmentLevelEnum = z.enum(['BB', 'MB', 'BSH', 'BSB']);

// Schema untuk validasi assessment
export const assessmentSchema = z.object({
    studentId: z
        .number()
        .int()
        .positive({ message: 'ID siswa harus berupa angka positif' }),
    teacherId: z
        .number()
        .int()
        .positive({ message: 'ID guru harus berupa angka positif' }),
    indicatorId: z
        .number()
        .int()
        .positive({ message: 'ID indikator harus berupa angka positif' }),
    periodId: z
        .number()
        .int()
        .positive({ message: 'ID periode harus berupa angka positif' }),
    nilai: DevelopmentLevelEnum,
});

// Schema untuk validasi data utama
export const dataSchema = z.object({
    aspect: AspectEnum,
    description: z.string().min(1, 'Deskripsi harus diisi').optional(),
    assessments: z
        .array(assessmentSchema)
        .min(1, 'Harus ada minimal satu penilaian')
        .optional(),
});

// Schema untuk array data
export const upsertSchema = z.array(dataSchema);
