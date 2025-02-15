import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { PasswordInput } from '@/components/form/password-input';
import { SelectInput } from '@/components/form/select-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { updateTeacher } from '@/services/pages/(user)/teachers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeacherType } from '@/types/teacher';
import { updateSchema } from './validation';

type FormTeacherProps = {
    user?: TeacherType;
    onSuccess?: () => void;
};

export default function UpdateProfile({ user, onSuccess }: FormTeacherProps) {
    const { toast } = useToast();
    console.log(user);
    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            fullname: user?.fullname,
            email: user?.email,
            identity_number: user?.identity_number,
            classID: user?.Class?.id,
            role: user?.role,
            position: user?.position,
            password: undefined,
        },
    });

    const { isLoading: stateLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            if (!user?.id) {
                throw new Error('Teacher ID is required for updating data.');
            }
            return updateTeacher(user.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: `Data anda berhasil diperbarui.`,
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['profileData'] });
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

    const onSubmitForm: SubmitHandler<z.infer<typeof updateSchema>> = data => {
        data.classID = parseInt(data.classID);
        mutation.mutate(data);
    };

    return (
        <Card className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <Form {...form} key={user?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="space-y-6"
                >
                    <CardContent className="my-4">
                        <TextInput
                            control={form.control}
                            name="fullname"
                            label="Nama Lengkap"
                            placeholder="Masukkan nama"
                        />

                        <TextInput
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Masukkan email"
                            type="email"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <TextInput
                                control={form.control}
                                name="identity_number"
                                label="Nomor Identitas"
                                placeholder="Masukkan nomor identitas"
                                id="identity_number"
                                type="number"
                            />

                            <PasswordInput
                                control={form.control}
                                name="password"
                                label="Kata Sandi"
                                placeholder="Masukkan kata sandi baru"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <SelectInput
                                control={form.control}
                                name="classID"
                                label="Kelas"
                                placeholder="Pilih Kelas"
                                disabled={true}
                                options={[
                                    { value: '1', label: 'KELAS A1' },
                                    { value: '2', label: 'KELAS A2' },
                                    { value: '3', label: 'KELAS B1' },
                                    { value: '4', label: 'KELAS B2' },
                                ]}
                            />

                            <SelectInput
                                control={form.control}
                                name="role"
                                label="Peran"
                                disabled={true}
                                placeholder="Pilih Peran"
                                options={[
                                    { value: 'TEACHER', label: 'GURU' },
                                    { value: 'ADMIN', label: 'ADMIN' },
                                ]}
                            />

                            <SelectInput
                                control={form.control}
                                name="position"
                                label="Jabatan"
                                placeholder="Pilih Jabatan"
                                disabled={true}
                                options={[
                                    { value: 'TEACHER', label: 'GURU' },
                                    {
                                        value: 'HEADMASTER',
                                        label: 'KEPALA SEKOLAH',
                                    },
                                    { value: 'COMMITTEE', label: 'KOMITE' },
                                ]}
                            />
                        </div>
                    </CardContent>
                    <div className="sticky bottom-0 border-t bg-card p-4">
                        <DialogFooter>
                            <Button type="submit" disabled={stateLoading}>
                                {stateLoading || mutation.isPending
                                    ? 'Memproses...'
                                    : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </Form>
        </Card>
    );
}
