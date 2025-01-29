import * as z from 'zod';
import TerritoryForm from '../../../../../../components/form/territory-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DateInput } from '@/components/form/date-input';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SelectInput } from '@/components/form/select-input';
import { StudentType } from '@/types/student';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TerritoryCombobox } from '../../../../../../components/form/single-territory-combobox';
import { TextInput } from '@/components/form/text-input';
import { updateSchema } from './validation';
import { updateStudent } from '@/services/pages/(user)/students';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

type FormStudentProps = {
    student?: StudentType;
    onSuccess?: () => void;
};

export default function UpdateFormStudent({
    student,
    onSuccess,
}: FormStudentProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            fullname: student?.fullname || '',
            address: student?.address || '',
            parentName: student?.parentName || '',
            classID: student?.class?.id || undefined,
            religion: student?.religion || 'ISLAM',
            gender: student?.gender || 'LAKI_LAKI',
            birthDate: student?.birthDate
                ? new Date(student.birthDate)
                : undefined,
            birthPlace: student?.birthPlace,
        },
    });

    const { isLoading: stateLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            if (!student?.id) {
                throw new Error('Student ID is required for updating data.');
            }
            return updateStudent(student.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data siswa berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['students'] });
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
        console.log(data.address);
        if (typeof data.address === 'object') {
            data.address = JSON.stringify(data.address);
        }
        mutation.mutate(data);
    };

    return (
        <Card className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <Form {...form} key={student?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="flex h-full flex-col"
                >
                    <CardContent className="max-h-[calc(90vh-8rem)] space-y-4 overflow-y-auto p-6">
                        <TextInput
                            control={form.control}
                            name="fullname"
                            label="Nama Lengkap"
                            placeholder="Masukkan nama"
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <TextInput
                                control={form.control}
                                name="parentName"
                                label="Wali Murid"
                                placeholder="Wali Murid"
                            />

                            <SelectInput
                                control={form.control}
                                name="gender"
                                label="Jenis Kelamin"
                                placeholder="Pilih Jenis Kelamin"
                                options={[
                                    { value: 'LAKI_LAKI', label: 'LAKI-LAKI' },
                                    { value: 'PEREMPUAN', label: 'PEREMPUAN' },
                                ]}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <TerritoryCombobox
                                control={form.control}
                                name="birthPlace"
                                label="Pilih Tempat Lahir"
                            />

                            <DateInput
                                control={form.control}
                                name="birthDate"
                                label="Tanggal Lahir"
                                placeholder="Pilih tanggal lahir"
                                minDate={new Date('1900-01-01')}
                                maxDate={new Date()}
                            />
                        </div>

                        <TerritoryForm
                            control={form.control}
                            name="address"
                            label="Alamat"
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <SelectInput
                                control={form.control}
                                name="classID"
                                label="Kelas"
                                placeholder="Pilih Kelas"
                                options={[
                                    { value: '1', label: 'KELAS A1' },
                                    { value: '2', label: 'KELAS A2' },
                                    { value: '3', label: 'KELAS B1' },
                                    { value: '4', label: 'KELAS B2' },
                                ]}
                            />

                            <SelectInput
                                control={form.control}
                                name="religion"
                                label="Agama"
                                placeholder="Pilih Agama"
                                options={[
                                    { value: 'ISLAM', label: 'ISLAM' },
                                    { value: 'KRISTEN', label: 'KRISTEN' },
                                    { value: 'HINDU', label: 'HINDU' },
                                    { value: 'BUDDHA', label: 'BUDDHA' },
                                    { value: 'KONGHUCU', label: 'KONGHUCU' },
                                    { value: 'KATOLIK', label: 'KATOLIK' },
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
