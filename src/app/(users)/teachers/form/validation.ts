import * as z from 'zod';

export const formSchema = z.object({
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
