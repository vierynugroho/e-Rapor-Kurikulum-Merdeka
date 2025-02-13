'use client';

import { columns } from './columns';
import { DataTable } from './data-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getStudents } from '@/services/pages/(user)/students';

export default function StudentPage() {
    const { data, isLoading, error } = useQuery({
        queryFn: getStudents,
        queryKey: ['students'],
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertDescription>
                    Failed to load students: {error.message}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data ?? []} />
        </div>
    );
}
