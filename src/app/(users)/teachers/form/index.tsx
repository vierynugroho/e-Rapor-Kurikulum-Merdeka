import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { formSchema } from './validation';
import { Teacher } from '../../../../types/user-type';
import { PasswordInput } from '@/components/ui/password-input';

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
}

type FormTeacherProps = {
    teacher?: Teacher;
};

export default function FormTeacher({ teacher }: FormTeacherProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: teacher?.fullname || '',
            email: teacher?.email || '',
            identity_number: teacher?.identity_number || '',
            classID: teacher?.kelas?.id || undefined,
            role: teacher?.role || 'TEACHER',
        },
    });

    return (
        <Form {...form} key={teacher?.id || 'add-data'}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="identity_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIP / NIK</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="classID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kelas</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                disabled={form.getValues('role') === 'ADMIN'}
                                defaultValue={field?.value?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kelas" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Kelas A1</SelectItem>
                                    <SelectItem value="2">Kelas A2</SelectItem>
                                    <SelectItem value="3">Kelas B1</SelectItem>
                                    <SelectItem value="4">Kelas B2</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peran</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Peran" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="TEACHER">
                                        TEACHER
                                    </SelectItem>

                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">Simpan</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
