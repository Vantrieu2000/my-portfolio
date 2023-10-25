'use client';
import { jsPDF } from 'jspdf';

async function stringToPdf(text: string) {
    const doc = new jsPDF('portrait', 'mm', 'a4');

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    const bodyContent = doc.splitTextToSize(text, width - 10 - 10);

    let y = 15;
    for (var i = 0; i < bodyContent.length; i++) {
        if (y + 10 > height) {
            y = 15;
            doc.addPage();
        }
        doc.text(bodyContent[i], 10, y);
        y = y + 7;
    }
    doc.output('dataurlnewwindow');
}

export default stringToPdf;
