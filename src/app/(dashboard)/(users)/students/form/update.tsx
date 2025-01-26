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
import { Card, CardContent } from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateSchema } from './validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { StudentType } from '@/types/student';
import { updateStudent } from '@/services/page/(user)/students';
import { TerritoryCombobox } from '../components/single-territory-combobox';
import TerritoryForm from '../components/territory-form';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';

type FormStudentProps = {
    student?: StudentType;
    onSuccess?: () => void;
};

export default function UpdateFormStudent({
    student,
    onSuccess,
}: FormStudentProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            fullname: student?.fullname || '',
            address: student?.address || '',
            parentName: student?.parentName || '',
            classID: student?.class?.id || undefined,
            religion: student?.religion || 'ISLAM',
            gender: student?.gender || 'LAKI_LAKI',
            birthDate: student?.birthDate
                ? new Date(student.birthDate)
                : undefined,
            birthPlace: student?.birthPlace,
        },
    });

    const { isLoading: stateLoading } = form.formState;
    const queryClient = useQueryClient();

    const studentMutation = useMutation({
        mutationFn: (data: z.infer<typeof updateSchema>) => {
            if (!student?.id) {
                throw new Error('Student ID is required for updating data.');
            }
            return updateStudent(student.id, data);
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data siswa berhasil diperbarui.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['students'] });
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
        console.log(data.address);
        if (typeof data.address === 'object') {
            data.address = JSON.stringify(data.address);
        }
        studentMutation.mutate(data);
    };

    return (
        <Card className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <Form {...form} key={student?.id || 'add-data'}>
                <form
                    onSubmit={form.handleSubmit(onSubmitForm)}
                    className="flex h-full flex-col"
                >
                    <CardContent className="max-h-[calc(90vh-8rem)] space-y-4 overflow-y-auto p-6">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="parentName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wali Murid</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Wali Murid"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field?.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="LAKI_LAKI">
                                                    LAKI-LAKI
                                                </SelectItem>
                                                <SelectItem value="PEREMPUAN">
                                                    PEREMPUAN
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <TerritoryCombobox
                                control={form.control}
                                name="birthPlace"
                                label="Pilih Tempat Lahir"
                            />

                            <FormField
                                control={form.control}
                                name="birthDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal Lahir</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            'w-full pl-3 text-left font-normal',
                                                            !field.value &&
                                                                'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                'PPP',
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pilih tanggal
                                                                lahir
                                                            </span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={
                                                        field.value as Date
                                                    }
                                                    onSelect={(
                                                        date: Date | undefined,
                                                    ) => field.onChange(date)}
                                                    disabled={(date: Date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '1900-01-01',
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <TerritoryForm
                            control={form.control}
                            name="address"
                            label="Alamat"
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="classID"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kelas</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field?.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kelas" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    Kelas A1
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Kelas A2
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    Kelas B1
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    Kelas B2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Gender & Birth Date */}

                            <FormField
                                control={form.control}
                                name="religion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agama</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Agama" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ISLAM">
                                                    ISLAM
                                                </SelectItem>
                                                <SelectItem value="KRISTEN">
                                                    KRISTEN
                                                </SelectItem>
                                                <SelectItem value="KONGHUCU">
                                                    KONGHUCU
                                                </SelectItem>
                                                <SelectItem value="BUDDHA">
                                                    BUDDHA
                                                </SelectItem>
                                                <SelectItem value="KATOLIK">
                                                    KATOLIK
                                                </SelectItem>
                                                <SelectItem value="HINDU">
                                                    HINDU
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <div className="sticky bottom-0 border-t bg-card p-4">
                        <DialogFooter>
                            <Button type="submit" disabled={stateLoading}>
                                {stateLoading || studentMutation.isPending
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
