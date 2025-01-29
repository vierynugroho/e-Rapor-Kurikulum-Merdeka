import * as argon from 'argon2';
import {
    PrismaClient,
    Gender,
    Religion,
    UserRole,
    Semester,
    AssessmentAspects,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const encryptedPassword = await argon.hash('password');
    // Seed Classes
    console.log('seeding class!');
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
    console.log('seeding teachers!');
    await prisma.teacher.create({
        data: {
            fullname: 'Guru Kelas',
            email: 'guru@example.com',
            identity_number: '123456789',
            password: encryptedPassword,
            role: UserRole.TEACHER,
            classID: 1,
        },
    });

    await prisma.teacher.create({
        data: {
            fullname: 'Admin Sekolah',
            email: 'admin@example.com',
            identity_number: '987654321',
            password: encryptedPassword,
            role: UserRole.ADMIN,
        },
    });

    // Seed Students
    console.log('seeding students!');
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

    // Seed Teachers
    console.log('seeding theme!');
    await prisma.theme.createMany({
        data: [
            {
                title: 'Transportasi',
            },
            {
                title: 'Flora',
            },
            {
                title: 'Fauna',
            },
            {
                title: 'Olahraga',
            },
        ],
    });

    console.log('seeding period!');
    await prisma.period.createMany({
        data: [
            {
                year: '2024',
                semester: Semester.GANJIL,
                isActive: false,
            },
            {
                year: '2024',
                semester: Semester.GENAP,
                isActive: false,
            },
            {
                year: '2025',
                semester: Semester.GANJIL,
                isActive: true,
            },
        ],
    });

    console.log('seeding indicator!');
    await prisma.indicator.createMany({
        data: [
            {
                title: 'Pendidikan Karakter',
                description: 'Jati Diri: Pendidikan Karakter',
                assesment_type: AssessmentAspects.JATI_DIRI,
                themeId: 1,
            },
            {
                title: 'Pendidikan SAINTEK',
                description: 'Jati Diri: Pendidikan SAINS dan Teknologi',
                assesment_type:
                    AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI,
                themeId: 1,
            },
            {
                title: 'Pendidikan Agama',
                description: 'Agama: Pendidikan Agama dan Budi Pekerti',
                assesment_type: AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI,
                themeId: 1,
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
