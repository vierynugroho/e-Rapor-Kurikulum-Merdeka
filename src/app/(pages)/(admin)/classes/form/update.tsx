import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ClassType } from '@/types/class';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { updateClass } from '@/services/pages/class';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassCategory } from '@prisma/client';
import { SelectInput } from '@/components/form/select-input';

type FormClassProps = {
    classes?: ClassType;
    onSuccess?: () => void;
};

export default function UpdateFormClass({
    classes,
    onSuccess,
}: FormClassProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            name: classes?.name || '',
            category: classes?.category || ClassCategory.A,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            if (!classes?.id) {
                throw new Error('Class ID is required for updating data.');
            }
            return updateClass(classes.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data kelas berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['classes'] });
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
                <CardTitle>Class Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitForm)}
                        className="space-y-6"
                    >
                        <TextInput
                            control={form.control}
                            name="name"
                            label="Nama Kelas"
                            placeholder="Masukkan nama kelas"
                        />

                        <SelectInput
                            control={form.control}
                            name="category"
                            label="Kategori Kelas"
                            placeholder="Pilih Kategori"
                            options={[
                                { value: ClassCategory.A, label: 'A' },
                                { value: ClassCategory.B, label: 'B' },
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
