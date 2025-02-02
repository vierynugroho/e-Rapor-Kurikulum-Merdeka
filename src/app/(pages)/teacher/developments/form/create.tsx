import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createSchema } from './validation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateStudentDevelopment } from '@/types/student';
import LabellingInput from '@/components/form/labelling-input';
import LongTextInput from '@/components/form/long-text-input';
import { createStudentDevelopment } from '@/services/pages/development';
import { SelectInput } from '@/components/form/select-input';
import { getStudentsByTeacher } from '@/services/pages/(user)/students';

type FormStudentDevelopmentProps = {
    studentDevelopment?: CreateStudentDevelopment;
    onSuccess?: () => void;
};

export default function CreateFormStudentDevelopment({
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

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
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
        mutationFn: createStudentDevelopment,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data perkembangan siswa berhasil ditambahkan.',
                variant: 'default',
            });
            queryClient.invalidateQueries({
                queryKey: ['studentDevelopments'],
            });
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
