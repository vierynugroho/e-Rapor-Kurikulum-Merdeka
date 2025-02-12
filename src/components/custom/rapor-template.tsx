/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from '@react-pdf/renderer';
import { StudentType } from '@/types/student';
import { Semester } from '@prisma/client';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'extrabold',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'extrabold',
        marginBottom: 4,
    },
    headerAddress: {
        fontSize: 11,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    table: {
        width: '100%',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableColLabel: {
        width: '30%',
        padding: 5,
        backgroundColor: '#f2f2f2',
    },
    tableColValue: {
        width: '70%',
        padding: 5,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sectionTitle: {
        backgroundColor: '#FED8B1', // Light orange for Nilai section
        padding: 8,
        fontWeight: 'bold',
        borderBottom: '1px solid #000',
    },
    sectionContent: {
        padding: 8,
        minHeight: 60,
    },
    steamSection: {
        marginBottom: 15,
        border: '1px solid #000',
    },
    steamTitle: {
        backgroundColor: '#ADD8E6', // Light blue for STEAM section
        padding: 8,
        fontWeight: 'bold',
        borderBottom: '1px solid #000',
    },
    jatiDiriSection: {
        marginBottom: 15,
        border: '1px solid #000',
    },
    jatiDiriTitle: {
        backgroundColor: '#FED8B1', // Light blue for STEAM section
        padding: 8,
        fontWeight: 'bold',
        borderBottom: '1px solid #000',
    },
    projectSection: {
        marginBottom: 15,
        border: '1px solid #000',
    },
    projectTitle: {
        backgroundColor: '#90EE90', // Light green for Project section
        padding: 8,
        fontWeight: 'bold',
        borderBottom: '1px solid #000',
    },
    reflectionSection: {
        marginBottom: 15,
        border: '1px solid #000',
    },
    signatureContainer: {
        marginTop: 20,
        width: '100%',
    },
    signatureDate: {
        textAlign: 'right',
        marginBottom: 10,
        paddingRight: 40,
    },
    signatureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        width: '100%',
    },
    signatureLeft: {
        width: '45%',
        paddingLeft: 40,
    },
    signatureRight: {
        width: '45%',
        paddingRight: 40,
    },
    headmasterSection: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    signatureText: {
        marginBottom: 40,
        textAlign: 'center',
    },
    signatureName: {
        marginTop: 4,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signatureNIP: {
        fontSize: 10,
        textAlign: 'center',
        color: '#000',
    },
    signatureMengetahui: {
        textAlign: 'center',
        marginBottom: 4,
    },
    signatureRole: {
        textAlign: 'center',
        marginBottom: 40,
    },
    assessmentSection: {
        marginBottom: 8,
    },
    assessmentTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    assessmentText: {
        marginBottom: 4,
        lineHeight: 1.5,
    },
    attendanceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    attendanceBox: {
        width: '35%',
    },
    attendanceContent: {
        height: 30,
        border: '1px solid #000',
        marginBottom: 2,
    },
    attendanceLabel: {
        padding: 4,
        textAlign: 'center',
        border: '1px solid #000',
    },
    sakitLabel: {
        backgroundColor: '#FED8B1', // Light orange
    },
    izinLabel: {
        backgroundColor: '#ADD8E6', // Light blue
    },
    alphaLabel: {
        backgroundColor: '#90EE90', // Light green
    },

    // Updated signature styles
    signatureTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    headmasterBox: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
    },
});

interface RaporPDFDocumentProps {
    student: StudentType;
}

const RaporPDFDocument: React.FC<RaporPDFDocumentProps> = ({ student }) => {
    const {
        fullname,
        Class,
        Development,
        Score,
        parentName,
        birthPlace,
        birthDate,
        address,
    } = student;

    const teacherName = student.teacherClass?.fullname || 'Guru Kelas';
    const teacherNIP = student.teacherClass?.identity_number || '123456789';
    const period = Score?.[0]?.Period || {
        semester: Semester.GANJIL,
        year: '2025',
    };

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <View style={styles.header}>
                    <Image
                        src="/assets/logo.png"
                        style={{ width: 70, height: 90 }}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>
                            PEMERINTAH KOTA BLITAR
                        </Text>
                        <Text style={styles.headerTitle}>DINAS PENDIDIKAN</Text>
                        <Text style={styles.headerTitle}>
                            UPT SATUAN PENDIDIKAN
                        </Text>
                        <Text style={styles.headerTitle}>
                            TK NEGERI 2 SANANWETAN
                        </Text>
                        <Text style={styles.headerAddress}>
                            Jl. Kalimantan No. 2 Kota Blitar
                        </Text>
                    </View>
                </View>

                <Text style={styles.title}>
                    LAPORAN PENILAIAN PERKEMBANGAN ANAK DIDIK{'\n'}TAHUN
                    PELAJARAN {period.year} SEMESTER{' '}
                    {period.semester === 'GANJIL' ? 'GANJIL' : 'GENAP'}
                </Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Nama Sekolah</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>TKN 2 Sananwetan</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Nama Siswa</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>{fullname}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Tempat, Tanggal Lahir</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>
                                {birthPlace}, {formatDate(birthDate!)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Nama Orang Tua</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>{parentName}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Alamat</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>{address}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Kelas</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>{Class?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Guru Kelas</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>{teacherName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.assessmentTitle}>
                        Perkembangan Fisik
                    </Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColLabel}>
                                <Text>Tinggi Badan</Text>
                            </View>
                            <View style={styles.tableColValue}>
                                <Text>{Development?.[0]?.height} cm</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColLabel}>
                                <Text>Berat Badan</Text>
                            </View>
                            <View style={styles.tableColValue}>
                                <Text>{Development?.[0]?.weight} kg</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColLabel}>
                                <Text>Catatan</Text>
                            </View>
                            <View style={styles.tableColValue}>
                                <Text>
                                    {Development?.[0]?.notes?.replace(
                                        /<[^>]*>/g,
                                        '',
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Nilai Section */}
                <View style={styles.jatiDiriSection}>
                    <View style={styles.jatiDiriTitle}>
                        <Text>JATI DIRI</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {Score?.filter(
                            score =>
                                score?.Indicator?.assesment_type ===
                                'JATI_DIRI',
                        ).map(score => (
                            <Text key={score.id}>
                                {score.description?.replace(/<[^>]*>/g, '')}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* STEAM Section */}
                <View style={styles.steamSection}>
                    <View style={styles.steamTitle}>
                        <Text>
                            Proses dalam Literasi, Matematika, Sains, Teknologi,
                            Rekayasa dan Seni (STEAM)
                        </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {Score?.filter(
                            score =>
                                score?.Indicator?.assesment_type ===
                                'DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI',
                        ).map(score => (
                            <Text key={score.id}>
                                {score.description?.replace(/<[^>]*>/g, '')}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* Project Section */}
                <View style={styles.projectSection}>
                    <View style={styles.projectTitle}>
                        <Text>Projek Penguatan Profil Pelajar Pancasila</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {Score?.filter(
                            score =>
                                score?.Indicator?.assesment_type ===
                                'NILAI_AGAMA_DAN_BUDI_PEKERTI',
                        ).map(score => (
                            <Text key={score.id}>
                                {score.description?.replace(/<[^>]*>/g, '')}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* Reflection Section */}
                <View style={styles.reflectionSection}>
                    <View style={styles.sectionTitle}>
                        <Text>Refleksi Guru</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {student.Reflection?.map(reflection => (
                            <Text key={reflection.id}>
                                {reflection.description?.replace(
                                    /<[^>]*>/g,
                                    '',
                                )}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* Attendance Status Boxes */}
                <View style={styles.attendanceSection}>
                    <View style={styles.attendanceBox}>
                        <View style={styles.attendanceContent} />
                        <View
                            style={[styles.attendanceLabel, styles.sakitLabel]}
                        >
                            <Text>Sakit</Text>
                        </View>
                    </View>
                    <View style={styles.attendanceBox}>
                        <View style={styles.attendanceContent} />
                        <View
                            style={[styles.attendanceLabel, styles.izinLabel]}
                        >
                            <Text>Izin</Text>
                        </View>
                    </View>
                    <View style={styles.attendanceBox}>
                        <View style={styles.attendanceContent} />
                        <View
                            style={[styles.attendanceLabel, styles.alphaLabel]}
                        >
                            <Text>Tanpa Keterangan</Text>
                        </View>
                    </View>
                </View>

                {/* Signature Section */}
                <View style={styles.signatureContainer}>
                    <Text style={styles.signatureDate}>
                        Blitar, 21 Desember 2023
                    </Text>

                    <View style={styles.signatureRow}>
                        <View style={styles.signatureLeft}>
                            <Text style={styles.signatureMengetahui}>
                                Mengetahui
                            </Text>
                            <Text style={styles.signatureRole}>
                                Orang Tua / Walimurid
                            </Text>
                            <Text style={styles.signatureName}>
                                (.........................)
                            </Text>
                        </View>

                        <View style={styles.signatureRight}>
                            <Text style={styles.signatureRole}>Guru Kelas</Text>
                            <Text style={styles.signatureName}>
                                NASRIYAH, S.Pd. AUD
                            </Text>
                            <Text style={styles.signatureNIP}>
                                NIP. 197111082005012011
                            </Text>
                        </View>
                    </View>

                    <View style={styles.headmasterSection}>
                        <Text style={styles.signatureMengetahui}>
                            Mengetahui
                        </Text>
                        <Text style={styles.signatureRole}>
                            Kepala UPT SP TK Negeri 2 Sananwetan
                        </Text>
                        <Text style={styles.signatureName}>SETIYANI, S.Pd</Text>
                        <Text style={styles.signatureNIP}>
                            NIP. {teacherNIP}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default RaporPDFDocument;
