import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import LongTextInput from '@/components/form/long-text-input';
import { ReflectionType } from '@/types/student';
import { upsertReflections } from '@/services/pages/reflection';

type FormReflectionProps = {
    reflection?: ReflectionType;
    onSuccess?: () => void;
};

export default function UpdateFormReflection({
    reflection,
    onSuccess,
}: FormReflectionProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            studentId: reflection?.id || undefined,
            description: reflection?.reflection?.description || '',
            teacherId: reflection?.teacherId || undefined,
            periodId: reflection?.periodId || undefined,
            classId: reflection?.classID || undefined,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: upsertReflections,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data refleksi guru berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['reflections'] });
            onSuccess?.();
        },
        onError: (error: Error) => {
            toast({
                title: 'Gagal',
                description: error.message,
                variant: 'destructive',
            });

            console.error('Error:', error);
        },
    });

    const onSubmitForm: SubmitHandler<
        z.infer<typeof updateSchema>
    > = async data => {
        mutation.mutate(data);
    };

    return (
        <Card className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <Form {...form} key={reflection?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="space-y-6"
                >
                    <CardContent className="max-h-[calc(80vh-8rem)] space-y-4 overflow-y-auto p-6">
                        <LongTextInput
                            control={form.control}
                            name="description"
                            label="Refleksi Guru"
                            placeholder="Start typing..."
                            required
                        />
                    </CardContent>
                    <div className="sticky bottom-0 border-t bg-card p-4">
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={isLoading || mutation.isPending}
                            >
                                {isLoading || mutation.isPending
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
