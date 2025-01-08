import { columns } from './columns';
import { DataTable } from './data-table';
import { getTeachers } from '@/services/page/(user)/teachers';

export default async function TeachersPage() {
    const teachers = await getTeachers();
    const data = teachers.data;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
