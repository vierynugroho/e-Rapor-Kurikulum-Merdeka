import * as z from 'zod';

export const formSchema = z.object({
    user_id: z.string().min(8, 'User ID is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
