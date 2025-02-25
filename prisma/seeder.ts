import * as bcrypt from 'bcrypt';
import {
    PrismaClient,
    Gender,
    Religion,
    UserRole,
    Semester,
    AssessmentAspects,
    ClassCategory,
    UserPosition,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const encryptedPassword = await bcrypt.hash('password', 10);

    // Seed Classes
    console.log('seeding start!');
    console.log('seeding class...');
    await prisma.class.createMany({
        data: [
            {
                name: 'Kelas A1',
                category: 'A',
            },
            {
                name: 'Kelas A2',
                category: 'A',
            },
        ],
    });

    await prisma.class.createMany({
        data: [
            {
                name: 'Kelas B1',
                category: 'B',
            },
            {
                name: 'Kelas B2',
                category: 'B',
            },
        ],
    });

    console.log('seeding teachers...');
    await prisma.teacher.create({
        data: {
            fullname: 'NASRIYAH, S.Pd. AUD',
            email: 'nasriyah@sanewa.com',
            identity_number: '197111082005012011',
            password: encryptedPassword,
            position: UserPosition.TEACHER,
            role: UserRole.TEACHER,
            classID: 1,
        },
    });

    await prisma.teacher.create({
        data: {
            fullname: 'Admin Sekolah',
            email: 'admin@sanewa.com',
            identity_number: '987654321',
            password: encryptedPassword,
            position: UserPosition.TEACHER,
            role: UserRole.ADMIN,
        },
    });

    await prisma.teacher.create({
        data: {
            fullname: 'SETIYANI, S.Pd',
            email: 'setiyani@sanewa.com',
            identity_number: '196609101987022005',
            password: encryptedPassword,
            position: UserPosition.HEADMASTER,
            role: UserRole.ADMIN,
        },
    });

    console.log('seeding students...');
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
                religion: Religion.KRISTEN,
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

    console.log('seeding themes...');
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
            {
                title: 'Teknologi',
            },
            {
                title: 'Profesi',
            },
            {
                title: 'Kegiatan',
            },
        ],
    });

    console.log('seeding periods...');
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

    console.log('seeding indicators...');
    await prisma.indicator.createMany({
        data: [
            {
                title: 'Pendidikan Karakter',
                description: 'Superhero: Pendidikan Karakter seperti Naruto',
                assesment_type: AssessmentAspects.JATI_DIRI,
                themeId: 1,
                classCategory: ClassCategory.A,
            },
            {
                title: 'Pendidikan Karakter',
                description: 'Superhero: Pendidikan Karakter seperti Saitama',
                assesment_type: AssessmentAspects.JATI_DIRI,
                themeId: 1,
                classCategory: ClassCategory.B,
            },
            {
                title: 'Pendidikan SAINTEK',
                description: 'SAINTEK: Pemanfaatan AI',
                assesment_type:
                    AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI,
                themeId: 1,
                classCategory: ClassCategory.A,
            },
            {
                title: 'Pendidikan SAINTEK: Programming',
                description:
                    'SAINTEK: Pemrograman Javasript untuk Anak Usia Dini',
                assesment_type:
                    AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI,
                themeId: 1,
                classCategory: ClassCategory.A,
            },
            {
                title: 'Pendidikan SAINTEK',
                description: 'SAINTEK: Coding for kids',
                assesment_type:
                    AssessmentAspects.DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI,
                themeId: 1,
                classCategory: ClassCategory.B,
            },
            {
                title: 'Pendidikan Agama Islam',
                description: 'Agama: Pendidikan Agama Islam dan Budi Pekerti',
                assesment_type: AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI,
                themeId: 1,
                classCategory: ClassCategory.A,
            },
            {
                title: 'Pendidikan Agama Kristen',
                description: 'Agama: Pendidikan Agama Kristen dan Budi Pekerti',
                assesment_type: AssessmentAspects.NILAI_AGAMA_DAN_BUDI_PEKERTI,
                themeId: 1,
                classCategory: ClassCategory.B,
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
