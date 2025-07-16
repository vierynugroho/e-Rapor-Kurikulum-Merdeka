import React from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionMenu from './components/action-menu';
import { IndicatorType } from '@/types/indicator';
import { AssessmentAspects, ClassCategory } from '@prisma/client';

export const columns: ColumnDef<IndicatorType>[] = [
    {
        id: 'ID',
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Judul
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'assesment_type',
        header: 'Kategori',
        cell: ({ row }: CellContext<IndicatorType, unknown>) => {
            const type = row.original.assesment_type as AssessmentAspects;
            const displayText =
                AssessmentAspects[type]?.replace(/_/g, ' ') ||
                'Tidak Diketahui';
            return displayText;
        },
    },
    {
        accessorKey: 'classCategory',
        header: 'Kelas',
        cell: ({ row }: CellContext<IndicatorType, unknown>) => {
            const type = row.original.classCategory as ClassCategory;
            if (!type) return 'Tidak Diketahui';
            return type.replace(/_/g, ' ');
        },
    },
    {
        accessorFn: row => row.Theme?.title || '-',
        header: 'Tema',
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            const themes = row.original;
            return <ActionMenu data={themes} />;
        },
    },
];
