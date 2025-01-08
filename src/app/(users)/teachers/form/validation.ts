import * as z from 'zod';

export const formSchema = z.object({
    fullname: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    nip: z.string().min(8, 'NIP must be at least 8 characters'),
    classID: z.number({
        required_error: 'Please select a class',
    }),
    role: z.enum(['TEACHER', 'ADMIN'], {
        required_error: 'Please select a role',
    }),
});
