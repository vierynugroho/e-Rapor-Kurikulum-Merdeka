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

import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/pagination';
import { OnStateDatePicker } from '@/components/form/state-date';

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

    // State untuk menyimpan tanggal
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        undefined,
    );

    // Ambil tanggal dari localStorage saat pertama kali render
    React.useEffect(() => {
        const savedDate = localStorage.getItem('selectedDate');
        if (savedDate) {
            setSelectedDate(new Date(savedDate));
        }
    }, []);

    // Simpan tanggal ke localStorage setiap kali berubah
    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            localStorage.setItem('selectedDate', date.toISOString());
        } else {
            localStorage.removeItem('selectedDate');
        }
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
        <div className="w-full space-y-4">
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <Input
                    placeholder="Filter berdasarkan nama siswa..."
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
                    <OnStateDatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="Pilih Tanggal Rapor"
                        buttonLabel="Set Tanggal Rapor"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table className="w-full table-auto">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        key={header.id}
                                        className="whitespace-nowrap px-2 py-3 text-sm font-medium"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
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
                                        <TableCell
                                            key={cell.id}
                                            className="max-w-[120px] truncate px-2 py-2 text-sm sm:max-w-[180px] md:max-w-[250px]"
                                            title={String(cell.getValue())}
                                        >
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

            <div className="flex flex-col items-center justify-between space-y-2 py-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                <div className="text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} data ditemukan.
                </div>
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
