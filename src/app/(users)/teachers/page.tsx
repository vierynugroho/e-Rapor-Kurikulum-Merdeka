import { Teacher } from '../user-type';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Teacher[]> {
    return [
        {
            id: 1,
            fullname: 'John Doe',
            email: 'johndoe@example.com',
            nip: '123456789',
            password: 'password',
            classID: 101,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 101,
                name: 'Class A1',
            },
        },
        {
            id: 999,
            fullname: 'Viery Nugroho',
            email: 'viery@example.com',
            nip: '999111222333',
            password: 'password',

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'ADMIN',
        },
        {
            id: 2,
            fullname: 'Stephen Doe',
            email: 'stephendoe@example.com',
            nip: '222333444',
            password: 'password',
            classID: 102,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 102,
                name: 'Class A2',
            },
        },
        {
            id: 3,
            fullname: 'Alex Doe',
            email: 'alexdoe@example.com',
            nip: '33334232122',
            password: 'password',
            classID: 103,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 103,
                name: 'Class B1',
            },
        },
        {
            id: 4,
            fullname: 'Leo Doe',
            email: 'leodoe@example.com',
            nip: '43331135799',
            password: 'password',
            classID: 104,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 104,
                name: 'Class B2',
            },
        },
        {
            id: 1,
            fullname: 'John Doe',
            email: 'johndoe@example.com',
            nip: '123456789',
            password: 'password',
            classID: 101,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 101,
                name: 'Class A1',
            },
        },
        {
            id: 999,
            fullname: 'Viery Nugroho',
            email: 'viery@example.com',
            nip: '999111222333',
            password: 'password',

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'ADMIN',
        },
        {
            id: 2,
            fullname: 'Stephen Doe',
            email: 'stephendoe@example.com',
            nip: '222333444',
            password: 'password',
            classID: 102,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 102,
                name: 'Class A2',
            },
        },
        {
            id: 3,
            fullname: 'Alex Doe',
            email: 'alexdoe@example.com',
            nip: '33334232122',
            password: 'password',
            classID: 103,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 103,
                name: 'Class B1',
            },
        },
        {
            id: 4,
            fullname: 'Leo Doe',
            email: 'leodoe@example.com',
            nip: '43331135799',
            password: 'password',
            classID: 104,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 104,
                name: 'Class B2',
            },
        },
        {
            id: 1,
            fullname: 'John Doe',
            email: 'johndoe@example.com',
            nip: '123456789',
            password: 'password',
            classID: 101,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 101,
                name: 'Class A1',
            },
        },
        {
            id: 999,
            fullname: 'Viery Nugroho',
            email: 'viery@example.com',
            nip: '999111222333',
            password: 'password',

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'ADMIN',
        },
        {
            id: 2,
            fullname: 'Stephen Doe',
            email: 'stephendoe@example.com',
            nip: '222333444',
            password: 'password',
            classID: 102,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 102,
                name: 'Class A2',
            },
        },
        {
            id: 3,
            fullname: 'Alex Doe',
            email: 'alexdoe@example.com',
            nip: '33334232122',
            password: 'password',
            classID: 103,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 103,
                name: 'Class B1',
            },
        },
        {
            id: 4,
            fullname: 'Leo Doe',
            email: 'leodoe@example.com',
            nip: '43331135799',
            password: 'password',
            classID: 104,

            createdAt: new Date('2025-01-01T10:00:00Z'),
            updateAt: new Date('2025-01-05T15:30:00Z'),

            role: 'TEACHER',
            class: {
                id: 104,
                name: 'Class B2',
            },
        },
    ];
}

export default async function TeachersPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
