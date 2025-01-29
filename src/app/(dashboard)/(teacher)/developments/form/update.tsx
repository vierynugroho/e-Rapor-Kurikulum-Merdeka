import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateSchema } from './validation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateStudentDevelopment } from '@/types/student';
import LabellingInput from '@/components/form/labelling-input';
import LongTextInput from '@/components/form/long-text-input';
import { updateStudentDevelopment } from '@/services/page/studentDevelopment';
import { SelectInput } from '@/components/form/select-input';
import { getStudentsByTeacher } from '@/services/page/(user)/students';

type FormStudentDevelopmentProps = {
    studentDevelopment?: UpdateStudentDevelopment;
    onSuccess?: () => void;
};

export default function UpdateFormStudentDevelopment({
    studentDevelopment,
    onSuccess,
}: FormStudentDevelopmentProps) {
    const { toast } = useToast();
    const { data: studentsData, isLoading: isLoadingStudents } = useQuery({
        queryFn: () => getStudentsByTeacher(1),
        queryKey: ['students', 1],
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
    const studentOptions =
        studentsData?.map(student => ({
            value: student.id?.toString() || '',
            label: student.fullname || 'Untitled Student',
        })) || [];

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            height: studentDevelopment?.height || 0,
            weight: studentDevelopment?.weight || 0,
            notes: studentDevelopment?.notes || '',
            studentID: studentDevelopment?.studentID || undefined,
            teacherID: studentDevelopment?.teacherID || undefined,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            console.log(data);
            if (!studentDevelopment?.id) {
                throw new Error(
                    'Student Development ID is required for updating data.',
                );
            }
            return updateStudentDevelopment(studentDevelopment.id, data);
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

                            <SelectInput
                                control={form.control}
                                name="studentID"
                                label="Siswa"
                                placeholder={
                                    isLoadingStudents
                                        ? 'Memuat data siswa...'
                                        : 'Pilih Siswa'
                                }
                                options={studentOptions}
                                disabled={isLoadingStudents}
                                noOptionsMessage={() =>
                                    'Tidak ada siswa tersedia'
                                }
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
                                {isLoading || mutation.isPending
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
