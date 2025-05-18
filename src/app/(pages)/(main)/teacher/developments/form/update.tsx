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
import { StudentDevelopmentType, UpdateStudentType } from '@/types/student';
import LabellingInput from '@/components/form/labelling-input';
import LongTextInput from '@/components/form/long-text-input';
import { upsertStudentDevelopment } from '@/services/pages/development';
import { useSession } from 'next-auth/react';

type FormStudentDevelopmentProps = {
    studentDevelopment?: Omit<UpdateStudentType, 'development'> & {
        development?: StudentDevelopmentType;
    };
    onSuccess?: () => void;
};

export default function UpdateFormStudentDevelopment({
    studentDevelopment,
    onSuccess,
}: FormStudentDevelopmentProps) {
    const { toast } = useToast();
    const { data: session, status } = useSession();
    // console.log(studentDevelopment);

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            height: studentDevelopment?.development?.height || 0,
            weight: studentDevelopment?.development?.weight || 0,
            notes: studentDevelopment?.development?.notes || '',
            studentID: studentDevelopment?.id || undefined,
            teacherID:
                session?.user.id || studentDevelopment?.development?.teacherID,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            if (!studentDevelopment?.id) {
                throw new Error(
                    'Student Development ID is required for updating data.',
                );
            }
            return upsertStudentDevelopment(data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data perkembangan siswa berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({
                queryKey: ['studentDevelopments'],
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
            <Form {...form} key={studentDevelopment?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="space-y-6"
                >
                    <CardContent className="max-h-[calc(80vh-8rem)] space-y-4 overflow-y-auto p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <LabellingInput
                                control={form.control}
                                name="height"
                                label="Tinggi Badan"
                                placeholder="Masukkan tinggi badan (cm)"
                                type="number"
                                unit="cm"
                            />
                            <LabellingInput
                                control={form.control}
                                name="weight"
                                label="Berat Badan"
                                placeholder="Masukkan berat badan (cm)"
                                type="number"
                                unit="kg"
                            />
                        </div>
                        <LongTextInput
                            control={form.control}
                            name="notes"
                            label="Catatan"
                            placeholder="Masukkan catatan"
                        />
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
