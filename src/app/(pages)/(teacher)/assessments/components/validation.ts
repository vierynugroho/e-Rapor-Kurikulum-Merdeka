import * as z from 'zod';

export const createSchema = z.object({
    kognitif: z.object({
        pengetahuan: z.string().min(1, 'Pengetahuan harus diisi'),
        pemahaman: z.string().min(1, 'Pemahaman harus diisi'),
        aplikasi: z.string().min(1, 'Aplikasi harus diisi'),
        nilai: z.string().min(1, 'Nilai harus dipilih'),
    }),
    afektif: z.object({
        sikap: z.string().min(1, 'Sikap harus diisi'),
        minat: z.string().min(1, 'Minat harus diisi'),
        perilaku: z.string().min(1, 'Perilaku harus diisi'),
        nilai: z.string().min(1, 'Nilai harus dipilih'),
    }),
    psikomotorik: z.object({
        keterampilan: z.string().min(1, 'Keterampilan harus diisi'),
        praktik: z.string().min(1, 'Praktik harus diisi'),
        proyek: z.string().min(1, 'Proyek harus diisi'),
        nilai: z.string().min(1, 'Nilai harus dipilih'),
    }),
});

export const updateSchema = z.object({
    kognitif: z.object({
        pengetahuan: z.string().min(1, 'Pengetahuan harus diisi'),
        pemahaman: z.string().min(1, 'Pemahaman harus diisi'),
        aplikasi: z.string().min(1, 'Aplikasi harus diisi'),
        nilai: z.string().min(1, 'Nilai harus dipilih'),
    }),
    afektif: z.object({
        sikap: z.string().min(1, 'Sikap harus diisi'),
        minat: z.string().min(1, 'Minat harus diisi'),
        perilaku: z.string().min(1, 'Perilaku harus diisi'),
        nilai: z.string().min(1, 'Nilai harus dipilih'),
    }),
    psikomotorik: z.object({
        keterampilan: z.string().min(1, 'Keterampilan harus diisi'),
        praktik: z.string().min(1, 'Praktik harus diisi'),
        proyek: z.string().min(1, 'Proyek harus diisi'),
        nilai: z.string().min(1, 'Nilai harus dipilih'),
    }),
});
