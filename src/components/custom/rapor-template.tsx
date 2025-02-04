import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { StudentType } from '@/types/student';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    header: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        width: 150,
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
    },
});

interface StudentPDFDocumentProps {
    student: StudentType;
}

const RaporPDFDocument: React.FC<StudentPDFDocumentProps> = ({ student }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Detail Siswa</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Nama Lengkap:</Text>
                    <Text style={styles.value}>{student.fullname}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Kelas:</Text>
                    <Text style={styles.value}>{student.Class?.name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Jenis Kelamin:</Text>
                    <Text style={styles.value}>
                        {student.gender === 'LAKI_LAKI'
                            ? 'Laki-Laki'
                            : 'Perempuan'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tinggi Badan:</Text>
                    <Text style={styles.value}>
                        {student?.Development?.map(dev => dev.height)} cm
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Berat Badan:</Text>
                    <Text style={styles.value}>
                        {student?.Development?.map(dev => dev.weight)} kg
                    </Text>
                </View>

                {/* Add more student details as needed */}
            </View>
        </Page>
    </Document>
);

export default RaporPDFDocument;
