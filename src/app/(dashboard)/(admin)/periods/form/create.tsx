import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { createSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePeriodType } from '@/types/period';
import { SelectInput } from '@/components/form/select-input';
import { createPeriod } from '@/services/page/period';

type FormClassProps = {
    period?: CreatePeriodType;
    onSuccess?: () => void;
};

export default function CreateFormPeriod({
    period,
    onSuccess,
}: FormClassProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            year: period?.year || '',
            semester: period?.semester || undefined,
            isActive: period?.isActive || undefined,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createPeriod,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data periode berhasil ditambahkan.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['periods'] });
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
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>Period Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} key={period?.id || 'add-data'}>
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
                                <Button type="submit">
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
