import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ClassType } from '@/types/class';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { createClass } from '@/services/pages/class';
import { createSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

type FormClassProps = {
    classes?: ClassType;
    onSuccess?: () => void;
};

export default function CreateFormClass({
    classes,
    onSuccess,
}: FormClassProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: classes?.name || '',
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createClass,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data kelas berhasil ditambahkan.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['classes'] });
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
                <CardTitle>Formulir Data Kelas</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} key={classes?.id || 'add-data'}>
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
