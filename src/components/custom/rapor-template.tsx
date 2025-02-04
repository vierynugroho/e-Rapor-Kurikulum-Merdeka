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

// Create styles
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
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
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
    signatureBox: {
        width: '30%',
        textAlign: 'center',
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        marginVertical: 40,
    },
});

interface RaporPDFDocumentProps {
    student: StudentType;
}

const RaporPDFDocument: React.FC<RaporPDFDocumentProps> = ({ student }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, Class, Development, Score } = student;
    const teacherName = Score?.[0]?.Teacher?.fullname || 'Nasriyah, S.Pd.AUD';
    const period = Score?.[0]?.Period || { semester: '1', year: '2023/2024' };

    const getAssessmentDescription = (value?: string) => {
        switch (value) {
            case 'BSB':
                return 'Berkembang Sangat Baik';
            case 'BSH':
                return 'Berkembang Sesuai Harapan';
            case 'MB':
                return 'Mulai Berkembang';
            case 'BB':
                return 'Belum Berkembang';
            default:
                return '';
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image
                        src="/assets/Viery_Nugroho.png"
                        style={{ width: 60, height: 60 }}
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
                    PELAJARAN {period.year} SEMESTER {period.semester}
                </Text>

                {/* Student and Semester Info */}
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
                            <Text>Kelas</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>{Class?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLabel}>
                            <Text>Semester / Tahun Ajaran</Text>
                        </View>
                        <View style={styles.tableColValue}>
                            <Text>
                                {period.semester === 'GANJIL'
                                    ? 'Ganjil'
                                    : 'Genap'}{' '}
                                / {period.year}
                            </Text>
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

                {/* Assessment */}
                {Score?.map(s => (
                    <View key={s.id} style={styles.section}>
                        <Text>
                            {s?.Indicator?.assesment_type.replace(/_/g, ' ')}
                        </Text>
                        <Text key={s.id}>
                            - {s?.Indicator?.title}: Ananda {student.fullname}{' '}
                            {getAssessmentDescription(s?.value ?? '')}. Catatan:{' '}
                            {s?.description?.replace(/<[^>]*>/g, '') || ''}
                        </Text>
                    </View>
                ))}

                {/* Footer Info */}
                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <View style={styles.signatureBox}>
                            <Text>Mengetahui,</Text>
                            <Text>Orang Tua / Wali murid</Text>
                            <View style={styles.signatureLine} />
                            <Text>(...........................)</Text>
                        </View>
                        <View style={styles.signatureBox}>
                            <Text>Blitar, 21 Desember 2023</Text>
                            <Text>Guru Kelas</Text>
                            <View style={styles.signatureLine} />
                            <Text>NASRIYAH, S.Pd.AUD</Text>
                            <Text>NIP. 197111082005012011</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default RaporPDFDocument;
