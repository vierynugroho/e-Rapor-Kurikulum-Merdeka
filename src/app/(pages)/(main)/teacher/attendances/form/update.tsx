import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentAttendanceType } from '@/types/student';
import { useSession } from 'next-auth/react';
import { upsertStudentAttendance } from '@/services/pages/attendance';
import { TextInput } from '@/components/form/text-input';

type FormStudentDevelopmentProps = {
    studentAttendance?: StudentAttendanceType;
    onSuccess?: () => void;
};

export default function UpdateFormStudentDevelopment({
    studentAttendance,
    onSuccess,
}: FormStudentDevelopmentProps) {
    const { toast } = useToast();
    const { data: session, status } = useSession();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            sick: studentAttendance?.attendance?.sick || 0,
            permit: studentAttendance?.attendance?.permit || 0,
            absent: studentAttendance?.attendance?.absent || 0,
            studentID: studentAttendance?.id || undefined,
            teacherID: studentAttendance?.teacherID || session?.user.id,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            if (!studentAttendance?.id) {
                throw new Error(
                    'Student Attendance ID is required for updating data.',
                );
            }
            return upsertStudentAttendance(data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data kehadiran siswa berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({
                queryKey: ['studentAttendances'],
            });
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
        mutation.mutate(data);
    };

    return (
        <Card className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <Form {...form} key={studentAttendance?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="space-y-6"
                >
                    <CardContent className="max-h-[calc(80vh-8rem)] space-y-4 overflow-y-auto p-6">
                        <div className="grid grid-cols-3 gap-4">
                            <TextInput
                                control={form.control}
                                name="sick"
                                label="Sakit"
                                placeholder="Masukkan total sakit"
                                type="number"
                            />
                            <TextInput
                                control={form.control}
                                name="absent"
                                label="Tanpa Keterangan"
                                placeholder="Masukkan total tanpa keterangan"
                                type="number"
                            />
                            <TextInput
                                control={form.control}
                                name="permit"
                                label="Izin"
                                placeholder="Masukkan total izin"
                                type="number"
                            />
                        </div>
                    </CardContent>
                    <div className="sticky bottom-0 border-t bg-card p-4">
                        <DialogFooter>
                            <Button type="submit">
                                {isLoading ||
                                mutation.isPending ||
                                status === 'loading'
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
