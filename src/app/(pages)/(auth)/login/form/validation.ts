import * as z from 'zod';

export const formSchema = z.object({
    identity_number: z.string().min(8, 'Identity number is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
