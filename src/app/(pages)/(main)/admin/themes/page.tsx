'use client';

import { columns } from './columns';
import { DataTable } from './data-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/services/pages/theme';

export default function ThemePage() {
    const { data, isLoading, error } = useQuery({
        queryFn: getThemes,
        queryKey: ['themes'],
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
                    Failed to load themes: {error.message}
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
