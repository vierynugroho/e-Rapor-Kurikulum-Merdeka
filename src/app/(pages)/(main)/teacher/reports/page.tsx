'use client';

import { columns } from './columns';
import { DataTable } from './data-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getStudentsByTeacher } from '@/services/pages/(user)/students';
import { useSession } from 'next-auth/react';

export default function StudentPage() {
    const { data: session, status } = useSession();
    const { data, isLoading, error } = useQuery({
        queryFn: () => getStudentsByTeacher(session?.user.id as number),
        queryKey: ['students'],
    });

    if (isLoading || status === 'loading') {
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

    console.log(data);
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data ?? []} />
        </div>
    );
}
