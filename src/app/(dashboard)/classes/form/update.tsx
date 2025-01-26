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
import { updateClass } from '@/services/page/class';
import { ClassType } from '@/types/class';

type FormClassProps = {
    classes?: ClassType;
    onSuccess?: () => void;
};

export default function UpdateFormClass({
    classes,
    onSuccess,
}: FormClassProps) {
    const { toast } = useToast(); // Gunakan hook toast Shadcn

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
                description: 'Data kelas berhasil ditambahkan.',
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
                        {/* Full Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter class name"
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
