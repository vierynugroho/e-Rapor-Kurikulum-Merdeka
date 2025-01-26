import * as z from 'zod';

export const createSchema = z.object({
    fullname: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    identity_number: z
        .string()
        .min(8, 'Identity number must be at least 8 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    classID: z.any({
        required_error: 'Please select a class',
    }),
    role: z.enum(['TEACHER', 'ADMIN'], {
        required_error: 'Please select a role',
    }),
});

export const updateSchema = z.object({
    fullname: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .optional(),
    email: z.string().email('Invalid email address').optional(),
    identity_number: z
        .string()
        .min(8, 'Identity number must be at least 8 characters')
        .optional(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .optional(),
    classID: z
        .any({
            required_error: 'Please select a class',
        })
        .optional(),
    role: z
        .enum(['TEACHER', 'ADMIN'], {
            required_error: 'Please select a role',
        })
        .optional(),
});
