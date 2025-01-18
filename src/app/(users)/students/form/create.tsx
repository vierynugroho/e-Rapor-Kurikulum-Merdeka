import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { createSchema } from './validation';
import { createTeacher } from '@/services/page/(user)/teachers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { StudentType } from '@/types/student';

type FormStudentProps = {
    student?: StudentType;
    onSuccess?: () => void;
};

export default function CreateFormStudent({
    student,
    onSuccess,
}: FormStudentProps) {
    const { toast } = useToast(); // Gunakan hook toast Shadcn

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            fullname: student?.fullname || '',
            address: student?.address || '',
            parentName: student?.parentName || '',
            classID: student?.class?.id || undefined,
            religion: student?.religion || 'ISLAM',
            gender: student?.gender || 'LAKI_LAKI',
            birthDate: student?.birthDate,
            birthPlace: student?.birthPlace,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const studentMutation = useMutation({
        mutationFn: createTeacher,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data siswa berhasil ditambahkan.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
            form.reset();
            onSuccess?.();
        },
        onError: error => {
            toast({
                title: 'Gagal',
                description: `${error.message}`,
                variant: 'destructive',
            });

            console.error('Error:', error);
        },
    });

    const onSubmitForm: SubmitHandler<
        z.infer<typeof createSchema>
    > = async data => {
        studentMutation.mutate(data);
    };

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>Student Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} key={student?.id || 'add-data'}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitForm)}
                        className="space-y-6"
                    >
                        {/* Full Name Field */}
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Alamat"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Identity Number and Password in same row */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="parentName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wali Murid</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Wali Murid"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthPlace"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Tempat Lahir"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Class and Role in same row */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="classID"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kelas</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field?.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kelas" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    Kelas A1
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Kelas A2
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    Kelas B1
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    Kelas B2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="religion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Peran</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Agama" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ISLAM">
                                                    ISLAM
                                                </SelectItem>
                                                <SelectItem value="KRISTEN">
                                                    KRISTEN
                                                </SelectItem>
                                                <SelectItem value="KONGHUCU">
                                                    KONGHUCU
                                                </SelectItem>
                                                <SelectItem value="BUDDHA">
                                                    BUDDHA
                                                </SelectItem>
                                                <SelectItem value="KATOLIK">
                                                    KATOLIK
                                                </SelectItem>
                                                <SelectItem value="HINDU">
                                                    HINDU
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <DialogFooter>
                                <Button type="submit">
                                    {isLoading || studentMutation.isPending
                                        ? 'Memproses...'
                                        : 'Simpan'}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
