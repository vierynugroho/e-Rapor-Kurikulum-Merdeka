'use client';

import '@/utils/pdfWorkerLoader';
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    FileText,
    Loader2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Download,
} from 'lucide-react';

export default function PDFViewer({
    fileUrl,
    buttonText = 'Lihat PDF',
    documentTitle = 'Dokumen PDF',
}) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Reset states when dialog opens or fileUrl changes
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError(null);
            setPageNumber(1);
        }
    }, [isOpen, fileUrl]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    }

    function onDocumentLoadError(error) {
        console.error('PDF loading error:', error);
        setError(
            'Gagal memuat PDF. Dokumen akan tetap terunduh pada perangkat anda.',
        );
        setLoading(false);
    }

    function goToNextPage() {
        setPageNumber(prevPageNumber =>
            prevPageNumber < numPages ? prevPageNumber + 1 : prevPageNumber,
        );
    }

    function goToPreviousPage() {
        setPageNumber(prevPageNumber =>
            prevPageNumber > 1 ? prevPageNumber - 1 : prevPageNumber,
        );
    }

    function downloadPdf() {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = documentTitle.replace(/\s+/g, '_') + '.pdf'; // Format nama file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>
                    <FileText size={16} className="mr-2" />
                    {buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent
                className="h-[80vh] w-full max-w-4xl overflow-auto"
                aria-labelledby={`pdf-${documentTitle}`}
            >
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-lg font-semibold">
                        {documentTitle}
                    </DialogTitle>
                    {numPages > 0 && !error && (
                        <Button
                            onClick={downloadPdf}
                            variant="outline"
                            size="sm"
                            className="mr-4"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Unduh PDF
                        </Button>
                    )}
                </div>

                {/* Tampilkan error jika ada */}
                {error && (
                    <div className="flex flex-col items-center justify-center p-6 text-red-600">
                        <AlertCircle className="mb-2 h-8 w-8" />
                        <p className="text-center">{error}</p>
                    </div>
                )}

                {/* Tampilkan loader saat memuat */}
                {loading && !error && (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}

                {/* Tampilkan dokumen jika tidak ada error */}
                {!error && (
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                    >
                        {numPages > 0 && (
                            <Page
                                key={`page-${pageNumber}`}
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                            />
                        )}
                    </Document>
                )}

                {/* Navigasi halaman */}
                {numPages > 0 && !error && (
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <Button
                            onClick={goToPreviousPage}
                            disabled={pageNumber <= 1}
                            variant="outline"
                            size="sm"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span>
                            Halaman {pageNumber} dari {numPages}
                        </span>
                        <Button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            variant="outline"
                            size="sm"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
