/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx-js-style';

interface ExcelExportOptions {
    filename?: string;
    sheetName?: string;
    excludeColumns?: string[];
}

export const exportToExcel = <T>(
    data: T[],
    options: ExcelExportOptions = {},
): boolean => {
    const {
        filename = 'data-export.xlsx',
        sheetName = 'Sheet1',
        excludeColumns = [],
    } = options;

    try {
        const filteredData = data.map(item => {
            const filteredItem: Record<string, any> = {};
            Object.keys(item as any).forEach(key => {
                if (!excludeColumns.includes(key)) {
                    filteredItem[key] = (item as any)[key];
                }
            });
            return filteredItem;
        });

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredData);

        // Format header
        const headerStyle = {
            font: { bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '4F81BD' } },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
            },
        };

        // Ambil range worksheet
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:Z1');

        // Terapkan gaya ke header (baris pertama)
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({
                r: range.s.r,
                c: col,
            });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = headerStyle;
            }
        }

        // Set column widths
        const colWidths = Object.keys(filteredData[0] || {}).map(key => ({
            wch: Math.max(
                key.length,
                ...filteredData.map(row => String(row[key]).length),
            ),
        }));
        worksheet['!cols'] = colWidths;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Generate Excel file
        XLSX.writeFile(workbook, filename);

        return true;
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        return false;
    }
};
