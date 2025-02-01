import { AssessmentAspects, DevelopmentLevel } from '@prisma/client';
import * as z from 'zod';
export const upsertSchema = z.object({
    nilai: z.string().min(1, 'Nilai harus diisi').optional(),
    description: z.string().min(1, 'Deskripsi harus diisi').optional(),
});

const indicatorSchema = z.object({
    nilai: z.enum(
        [
            DevelopmentLevel.BSB,
            DevelopmentLevel.BSH,
            DevelopmentLevel.MB,
            DevelopmentLevel.BB,
        ],
        {
            required_error: 'Nilai harus diisi',
            invalid_type_error: 'Nilai tidak valid',
        },
    ),
});

// Create a schema for each assessment aspect
const aspectSchema = z.object({
    description: z
        .string({
            required_error: 'Deskripsi harus diisi',
        })
        .min(1, 'Deskripsi tidak boleh kosong'),
    indicators: z.record(z.string(), indicatorSchema),
});

// Main form schema
export const assessmentFormSchema = z.object({
    [AssessmentAspects.JATI_DIRI]: aspectSchema,
    [AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI]:
        aspectSchema,
    [AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI]: aspectSchema,
});
