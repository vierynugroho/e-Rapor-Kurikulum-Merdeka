'use client';
import * as React from 'react';

import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/pagination';
import { Download, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import CreateFormStudent from './form/create';
import { exportToExcel } from '@/utils/toExcel';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);

    const handleCloseEditDialog = () => {
        setIsCreateDialogOpen(false);
    };

    const handleExportToExcel = () => {
        // Define columns to exclude from export (if any)
        const excludeColumns = ['actions'];

        exportToExcel(data, {
            filename: 'data-siswa.xlsx',
            sheetName: 'Data Siswa',
            excludeColumns,
        });
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div>
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <Input
                    placeholder="Filter berdasarkan nama..."
                    value={
                        (table
                            .getColumn('fullname')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={event =>
                        table
                            .getColumn('fullname')
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                <div className="user-action flex flex-col gap-2 sm:flex-row">
                    <Dialog
                        open={isCreateDialogOpen}
                        onOpenChange={setIsCreateDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button className="w-full bg-blend-hard-light sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" /> Tambah Data
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] md:max-w-[768px]">
                            <DialogHeader>
                                <DialogTitle>Tambah Data Siswa</DialogTitle>
                                <DialogDescription>
                                    Buat data siswa baru sekolah anda di sini
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <CreateFormStudent
                                    onSuccess={handleCloseEditDialog}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button
                        onClick={handleExportToExcel}
                        className="w-full bg-green-800 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 sm:w-auto"
                    >
                        <Download className="mr-2 h-4 w-4" /> Export to Excel
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-md border">
                <Table className="w-full table-auto">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Data Tidak Ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
