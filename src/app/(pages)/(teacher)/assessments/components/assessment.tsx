/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SelectInput } from '@/components/form/select-input';
import LongTextInput from '@/components/form/long-text-input';
import { Form } from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
    AssessmentAspects,
    ClassCategory,
    DevelopmentLevel,
    Theme,
} from '@prisma/client';
import * as z from 'zod';
import { getIndicatorsByClassCategory } from '@/services/pages/indicator';
import { UpdateIndicatorType } from '@/types/indicator';
import { StudentType } from '@/types/student';
import { getAssessment, upsertAssessment } from '@/services/pages/assessment';
import { getActivePeriod } from '@/services/pages/period';

interface IndicatorWithTheme extends UpdateIndicatorType {
    Theme?: Theme | null;
}

interface Record<T> {
    [key: string]: T;
}

const createAssessmentSchema = (indicators: Record<IndicatorWithTheme[]>) => {
    const schemaFields: Record<any> = {};

    Object.entries(indicators).forEach(([aspect, aspectIndicators]) => {
        const aspectSchema: Record<any> = {
            description: z.string().optional(),
            indicators: z.object({}).optional(),
        };

        const indicatorFields: Record<any> = {};
        aspectIndicators.forEach((indicator: IndicatorWithTheme) => {
            indicatorFields[`${indicator.id}`] = z.object({
                value: z.string().optional(),
            });
        });

        aspectSchema.indicators = z.object(indicatorFields);
        schemaFields[aspect] = z.object(aspectSchema);
    });

    return z.object(schemaFields);
};

const DEVELOPMENT_LEVELS = [
    { value: DevelopmentLevel.BSB, label: 'BERKEMBANG SANGAT BAIK' },
    { value: DevelopmentLevel.BSH, label: 'BERKEMBANG SESUAI HARAPAN' },
    { value: DevelopmentLevel.MB, label: 'MULAI BERKEMBANG' },
    { value: DevelopmentLevel.BB, label: 'BELUM BERKEMBANG' },
];

interface FormAssessmentProps {
    student: StudentType;
    onSuccess?: () => void;
}

export const AssessmentForm: React.FC<FormAssessmentProps> = ({
    student,
    onSuccess,
}) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<string | AssessmentAspects>(
        AssessmentAspects.JATI_DIRI as AssessmentAspects,
    );

    const { data: indicators = [] } = useQuery({
        queryKey: ['indicators'],
        queryFn: () =>
            getIndicatorsByClassCategory(
                student?.Class?.category || ClassCategory.A,
            ),
    });

    const { data: studentAssessment, isLoading: isLoadingStudentAssessment } =
        useQuery({
            queryFn: () => getAssessment(student.id!),
            queryKey: ['studentsAssessments', student.id],
            staleTime: 5 * 60 * 1000,
            retry: 2,
        });

    const { data: activePeriod } = useQuery({
        queryKey: ['activePeriod'],
        queryFn: getActivePeriod,
    });

    console.log('active period');
    console.log(activePeriod);

    const allIndicators: Record<IndicatorWithTheme[]> = useMemo(() => {
        const grouped: Record<IndicatorWithTheme[]> = {
            [AssessmentAspects.JATI_DIRI]: [],
            [AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI]:
                [],
            [AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI]: [],
        };

        indicators.forEach(indicator => {
            if (grouped[indicator.assesment_type as AssessmentAspects]) {
                grouped[indicator.assesment_type as AssessmentAspects].push(
                    indicator,
                );
            }
        });

        return grouped;
    }, [indicators]);

    const assessmentSchema = createAssessmentSchema(allIndicators);
    type AssessmentFormData = z.infer<typeof assessmentSchema>;

    const defaultValues = useMemo(() => {
        const values: any = {};

        // Initialize base structure
        Object.keys(AssessmentAspects).forEach(aspect => {
            values[aspect] = {
                description: '',
                indicators: {},
            };
        });

        Object.entries(allIndicators).forEach(([aspect, aspectIndicators]) => {
            aspectIndicators.forEach(indicator => {
                if (!values[aspect].indicators) {
                    values[aspect].indicators = {};
                }

                const existingAssessment = studentAssessment?.find(
                    (assessment: any) =>
                        assessment.indicatorId === indicator.id,
                );

                values[aspect].indicators[indicator.id!] = {
                    value: existingAssessment?.value || '',
                };

                if (existingAssessment?.description) {
                    values[aspect].description = existingAssessment.description;
                }
            });
        });

        return values;
    }, [allIndicators, studentAssessment]);

    const form = useForm<AssessmentFormData>({
        resolver: zodResolver(assessmentSchema),
        defaultValues,
        values: defaultValues,
    });

    const mutation = useMutation({
        mutationFn: upsertAssessment,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data penilaian berhasil disimpan.',
            });
            queryClient.invalidateQueries({ queryKey: ['assessments'] });
            queryClient.invalidateQueries({
                queryKey: ['studentsAssessments'],
            });
            onSuccess?.();
        },
        onError: (error: Error) => {
            toast({
                title: 'Gagal',
                description: error.message,
                variant: 'destructive',
            });
        },
    });

    const handleSubmit = (data: AssessmentFormData) => {
        const formattedData = Object.entries(data)
            .map(([aspect, aspectData]) => {
                // Filter out empty values
                const validAssessments = Object.entries(aspectData.indicators)
                    .filter(([_, value]) => (value as { value: string }).value)
                    .map(([indicatorId, value]) => ({
                        studentId: student.id,
                        teacherId: 1, // from teacher loggedIn
                        indicatorId: Number(indicatorId),
                        periodId: activePeriod?.id ?? null,
                        value: (value as { value: DevelopmentLevel }).value,
                    }));

                return {
                    aspect,
                    description: aspectData.description || '',
                    assessments: validAssessments,
                };
            })
            .filter(item => item.assessments.length > 0 || item.description);

        mutation.mutate(formattedData);
    };

    const renderIndicatorFields = (
        indicators: IndicatorWithTheme[],
        aspect: AssessmentAspects,
    ) => {
        return indicators.map(indicator => (
            <div
                key={indicator.id}
                className="mb-6 space-y-4 rounded-lg border p-4"
            >
                <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                    <div className="flex-grow space-y-2">
                        <h5 className="font-medium">{indicator.title}</h5>
                        <p className="text-sm text-muted-foreground">
                            {indicator.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Tema: {indicator?.Theme?.title || ''}
                        </p>
                    </div>
                    <div className="mt-4 min-w-[200px] md:mt-0">
                        <SelectInput
                            control={form.control}
                            name={`${aspect}.indicators.${indicator.id}.value`}
                            label="Nilai"
                            placeholder="Pilih nilai"
                            options={DEVELOPMENT_LEVELS}
                        />
                    </div>
                </div>
            </div>
        ));
    };

    if (isLoadingStudentAssessment) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="max-h-[80vh] w-full max-w-3xl overflow-hidden">
            <CardHeader>
                <CardTitle>Form Penilaian Kurikulum Merdeka</CardTitle>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value={AssessmentAspects.JATI_DIRI}>
                        JATI DIRI
                    </TabsTrigger>
                    <TabsTrigger
                        value={
                            AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI
                        }
                    >
                        STEAM
                    </TabsTrigger>
                    <TabsTrigger
                        value={AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI}
                    >
                        AGAMA & BUDI PEKERTI
                    </TabsTrigger>
                </TabsList>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="mt-4"
                    >
                        <CardContent className="max-h-[calc(80vh-20rem)] space-y-4 overflow-y-auto p-6">
                            <TabsContent value={AssessmentAspects.JATI_DIRI}>
                                {renderIndicatorFields(
                                    allIndicators[AssessmentAspects.JATI_DIRI],
                                    AssessmentAspects.JATI_DIRI,
                                )}
                                <div className="mt-4">
                                    <LongTextInput
                                        control={form.control}
                                        name={`${AssessmentAspects.JATI_DIRI}.description`}
                                        label="Deskripsi"
                                        placeholder="Masukkan deskripsi penilaian..."
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent
                                value={
                                    AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI
                                }
                            >
                                {renderIndicatorFields(
                                    allIndicators[
                                        AssessmentAspects
                                            .DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI
                                    ],
                                    AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI,
                                )}
                                <div className="mt-4">
                                    <LongTextInput
                                        control={form.control}
                                        name={`${AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI}.description`}
                                        label="Deskripsi"
                                        placeholder="Masukkan deskripsi penilaian..."
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent
                                value={
                                    AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI
                                }
                            >
                                {renderIndicatorFields(
                                    allIndicators[
                                        AssessmentAspects
                                            .NILAI_AGAMA_DAN_BUDI_PEKERTI
                                    ],
                                    AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI,
                                )}
                                <div className="mt-4">
                                    <LongTextInput
                                        control={form.control}
                                        name={`${AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI}.description`}
                                        label="Deskripsi"
                                        placeholder="Masukkan deskripsi penilaian..."
                                    />
                                </div>
                            </TabsContent>
                        </CardContent>
                        <div className="sticky bottom-0 border-t bg-card p-4">
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending
                                        ? 'Memproses...'
                                        : 'Simpan'}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </Tabs>
        </Card>
    );
};
