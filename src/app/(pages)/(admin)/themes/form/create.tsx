import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreateThemeType } from '@/types/theme';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { createSchema } from './validation';
import { createTheme } from '@/services/pages/theme';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

type FormClassProps = {
    themes?: CreateThemeType;
    onSuccess?: () => void;
};

export default function CreateFormTheme({ themes, onSuccess }: FormClassProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            title: themes?.title || '',
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTheme,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data tema berhasil ditambahkan.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['themes'] });
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
                <CardTitle>Theme Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} key={themes?.id || 'add-data'}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitForm)}
                        className="space-y-6"
                    >
                        <TextInput
                            control={form.control}
                            name="title"
                            label="Judul Tema"
                            placeholder="Masukkan judul tema pembelajaran"
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
