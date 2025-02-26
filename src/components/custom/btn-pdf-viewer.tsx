import dynamic from 'next/dynamic';

const CustomPDFViewer = dynamic(() => import('./viewer'), { ssr: false });

export default CustomPDFViewer;
