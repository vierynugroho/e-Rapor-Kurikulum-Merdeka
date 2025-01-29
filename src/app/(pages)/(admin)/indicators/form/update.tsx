import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/text-input';
import { updateSchema } from './validation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateIndicatorType } from '@/types/indicator';
import { updateIndicator } from '@/services/pages/indicator';
import LongTextInput from '@/components/form/long-text-input';
import { SelectInput } from '@/components/form/select-input';
import { getThemes } from '@/services/pages/theme';

type FormIndicatorProps = {
    indicator?: UpdateIndicatorType;
    onSuccess?: () => void;
};

export default function UpdateFormIndicator({
    indicator,
    onSuccess,
}: FormIndicatorProps) {
    const { toast } = useToast();

    const { data: themesData, isLoading: isLoadingThemes } = useQuery({
        queryFn: getThemes,
        queryKey: ['themes'],
    });

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            title: indicator?.title || '',
            description: indicator?.description || '',
            themeID: indicator?.themeID || undefined,
            assesment_type: indicator?.assesment_type || undefined,
        },
    });

    const { isLoading } = form.formState;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            console.log(data);
            if (!indicator?.id) {
                throw new Error('Indicator ID is required for updating data.');
            }
            return updateIndicator(indicator.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data indikator berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['indicators'] });
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

    const themeOptions =
        themesData?.map(theme => ({
            value: theme.id?.toString() || '',
            label: theme.title || 'Untitled Theme',
        })) || [];

    const assesmentTypeOptions = [
        {
            value: 'NILAI_AGAMA_DAN_BUDI_PEKERTI',
            label: 'NILAI AGAMA DAN BUDI PEKERTI',
        },
        { value: 'JATI_DIRI', label: 'JATI DIRI' },
        {
            value: 'DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI',
            label: 'DASAR LITERASI MATEMATIKA SAINS TEKNOLOGI REKAYASA DAN SENI',
        },
    ];

    return (
        <Card className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <Form {...form} key={indicator?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="space-y-6"
                >
                    <CardContent className="max-h-[calc(80vh-8rem)] space-y-4 overflow-y-auto p-6">
                        <TextInput
                            control={form.control}
                            name="title"
                            label="Judul Indikator"
                            placeholder="Masukkan judul indikator pembelajaran"
                        />

                        <LongTextInput
                            control={form.control}
                            name="description"
                            label="Deskripsi"
                            placeholder="Start typing..."
                            required
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <SelectInput
                                control={form.control}
                                name="themeID"
                                label="Tema"
                                placeholder={
                                    isLoadingThemes
                                        ? 'Memuat tema...'
                                        : 'Pilih Tema'
                                }
                                options={themeOptions}
                                disabled={isLoadingThemes}
                                noOptionsMessage={() =>
                                    'Tidak ada tema tersedia'
                                }
                            />

                            <SelectInput
                                control={form.control}
                                name="assesment_type"
                                label="Kategori"
                                placeholder="Pilih Kategori"
                                options={assesmentTypeOptions}
                                noOptionsMessage={() =>
                                    'Tidak ada kategori tersedia'
                                }
                            />
                        </div>
                    </CardContent>
                    <div className="sticky bottom-0 border-t bg-card p-4">
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    mutation.isPending ||
                                    isLoadingThemes
                                }
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
