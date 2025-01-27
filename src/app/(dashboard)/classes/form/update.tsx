import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ClassType } from '@/types/class';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { updateClass } from '@/services/page/class';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

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
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const classMutation = useMutation({
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
        classMutation.mutate(data);
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

                        <div className="flex justify-end">
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={classMutation.isPending}
                                >
                                    {isLoading || classMutation.isPending
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
