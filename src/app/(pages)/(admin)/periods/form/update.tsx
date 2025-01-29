import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePeriodType } from '@/types/period';
import { SelectInput } from '@/components/form/select-input';
import { updatePeriod } from '@/services/pages/period';

type FormPeriodProps = {
    period?: UpdatePeriodType;
    onSuccess?: () => void;
};

export default function UpdateFormPeriod({
    period,
    onSuccess,
}: FormPeriodProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            year: period?.year || '',
            semester: period?.semester || undefined,
            isActive: period?.isActive || undefined,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            console.log(data);
            if (!period?.id) {
                throw new Error('Period ID is required for updating data.');
            }
            return updatePeriod(period.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data periode berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['periods'] });
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
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>Period Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitForm)}
                        className="space-y-6"
                    >
                        <TextInput
                            control={form.control}
                            name="year"
                            label="Tahun Periode"
                            placeholder="Masukkan tahun pembelajaran"
                        />

                        <SelectInput
                            control={form.control}
                            name="semester"
                            label="Semester"
                            placeholder="Pilih Semester"
                            options={[
                                { value: 'GANJIL', label: 'GANJIL' },
                                { value: 'GENAP', label: 'GENAP' },
                            ]}
                        />

                        <SelectInput
                            control={form.control}
                            name="isActive"
                            label="Status Periode"
                            placeholder="Pilih Status Periode"
                            options={[
                                { value: 'true', label: 'AKTIF' },
                                { value: 'false', label: 'NON-AKTIF' },
                            ]}
                        />

                        <div className="flex justify-end">
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                >
                                    {isLoading || mutation.isPending
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
