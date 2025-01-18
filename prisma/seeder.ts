import { PrismaClient, Gender, Religion, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Classes
    await prisma.class.createMany({
        data: [
            {
                name: 'Class A1',
            },
            {
                name: 'Class A2',
            },
        ],
    });

    await prisma.class.createMany({
        data: [
            {
                name: 'Class B1',
            },
            {
                name: 'Class B2',
            },
        ],
    });

    // Seed Teachers
    await prisma.teacher.create({
        data: {
            fullname: 'John Doe',
            email: 'johndoe@example.com',
            identity_number: '123456789',
            password: 'securepassword',
            role: UserRole.TEACHER,
            classID: 1,
        },
    });

    await prisma.teacher.create({
        data: {
            fullname: 'Jane Smith',
            email: 'janesmith@example.com',
            identity_number: '987654321',
            password: 'anotherpassword',
            role: UserRole.ADMIN,
            classID: 3,
        },
    });

    // Seed Students
    await prisma.student.createMany({
        data: [
            {
                fullname: 'Ahmad Fauzi',
                gender: Gender.LAKI_LAKI,
                religion: Religion.ISLAM,
                parentName: 'Siti Aminah',
                birthPlace: 'Jakarta',
                birthDate: new Date(2010, 5, 15),
                classID: 1,
                address: 'Jl. Kebon Jeruk No. 12',
            },
            {
                fullname: 'Maria Kristina',
                gender: Gender.PEREMPUAN,
                religion: Religion.KATOLIK,
                parentName: 'Fransiscus',
                birthPlace: 'Bandung',
                birthDate: new Date(2009, 8, 25),
                classID: 2,
                address: 'Jl. Merdeka No. 8',
            },
            {
                fullname: 'Siti Aisyah',
                gender: Gender.PEREMPUAN,
                religion: Religion.ISLAM,
                parentName: 'Ali Abdullah',
                birthPlace: 'Surabaya',
                birthDate: new Date(2011, 3, 10),
                classID: 3,
                address: 'Jl. Pahlawan No. 5',
            },
        ],
    });

    console.log('Data seeding completed!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
