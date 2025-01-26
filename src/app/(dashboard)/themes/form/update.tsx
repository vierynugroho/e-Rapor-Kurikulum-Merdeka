import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { UpdateThemeType } from '@/types/theme';
import { updateTheme } from '@/services/page/theme';

type FormThemeProps = {
    themes?: UpdateThemeType;
    onSuccess?: () => void;
};

export default function UpdateFormTheme({ themes, onSuccess }: FormThemeProps) {
    const { toast } = useToast(); // Gunakan hook toast Shadcn

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            title: themes?.title || '',
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const classMutation = useMutation({
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
        classMutation.mutate(data);
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
                        {/* Full Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter theme title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
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
