export async function GET() {
    const pdfUrl =
        'https://kurikulum.kemdikbud.go.id/file/cp/paud/Capaian-Pembelajaran-PAUD.pdf';

    try {
        const response = await fetch(pdfUrl);

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: `Gagal mengambil PDF: ${response.status}`,
                }),
                {
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' },
                },
            );
        }

        const pdfBuffer = await response.arrayBuffer();

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
        });
    } catch (error) {
        console.error('Error fetching PDF:', error);
        return new Response(JSON.stringify({ error: 'Gagal mengambil PDF' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
