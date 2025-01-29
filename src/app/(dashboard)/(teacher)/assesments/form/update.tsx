import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { UpdateThemeType } from '@/types/theme';
import { updateSchema } from './validation';
import { updateTheme } from '@/services/page/theme';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

type FormThemeProps = {
    themes?: UpdateThemeType;
    onSuccess?: () => void;
};

export default function UpdateFormTheme({ themes, onSuccess }: FormThemeProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            title: themes?.title || '',
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            console.log(data);
            if (!themes?.id) {
                throw new Error('Theme ID is required for updating data.');
            }
            return updateTheme(themes.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data tema berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['themes'] });
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
                <CardTitle>Theme Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
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
