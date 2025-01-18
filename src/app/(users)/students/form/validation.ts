import * as z from 'zod';

export const createSchema = z.object({
    fullname: z.string().min(2, 'Name must be at least 2 characters'),
    religion: z.enum(
        ['ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'BUDDHA', 'HINDU'],
        {
            required_error: 'Please select a gender',
        },
    ),
    parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
    address: z.string().min(2, 'Name must be at least 2 characters'),
    birthPlace: z.string().min(2, 'Name must be at least 2 characters'),
    birthDate: z.string(),
    gender: z.enum(['LAKI_LAKI', 'PEREMPUAN'], {
        required_error: 'Please select a gender',
    }),
    classID: z.any({
        required_error: 'Please select a class',
    }),
});

export const updateSchema = z.object({
    fullname: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .optional(),
    religion: z
        .enum(['ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'BUDDHA', 'HINDU'], {
            required_error: 'Please select a gender',
        })
        .optional(),
    parentName: z
        .string()
        .min(2, 'Parent name must be at least 2 characters')
        .optional(),
    address: z.string().min(2, 'Name must be at least 2 characters').optional(),
    birthPlace: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .optional(),
    birthDate: z.string().optional(),
    classID: z
        .any({
            required_error: 'Please select a class',
        })
        .optional(),
    gender: z
        .enum(['LAKI_LAKI', 'PEREMPUAN'], {
            required_error: 'Please select a gender',
        })
        .optional(),
});
