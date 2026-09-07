import jsPDF from "jspdf";
import type { Bien } from "../Types/Types";

const NAVY = "#222344";
const GOLD = "#cdad7d";

const loadImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url, { mode: "cors" });
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (err) {
        console.error("Impossible de charger l'image pour le PDF", err);
        return null;
    }
};

const checkPageBreak = (doc: jsPDF, y: number, needed = 15): number => {
    if (y + needed > 280) {
        doc.addPage();
        return 20;
    }
    return y;
};

export const generateBienPdf = async (bien: Bien) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 0;

    // ===== EN-TÊTE =====
    doc.setFillColor(NAVY);
    doc.rect(0, 0, pageWidth, 32, "F");

    doc.setTextColor("#ffffff");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("Fiche du bien", margin, 14);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(GOLD);
    doc.text(`Généré le ${new Date().toLocaleDateString("fr-FR")}`, margin, 21);
    doc.text(`Réf. ${bien.id.slice(0, 10)}`, pageWidth - margin, 21, { align: "right" });

    y = 42;

    // ===== IMAGE =====
    const imgUrl = bien.images[0]?.url;
    if (imgUrl) {
        const base64 = await loadImageAsBase64(imgUrl);
        if (base64) {
            const imgWidth = pageWidth - margin * 2;
            const imgHeight = 75;
            doc.addImage(base64, "JPEG", margin, y, imgWidth, imgHeight, undefined, "FAST");
            y += imgHeight + 8;
        }
    }

    // ===== TITRE / LOCALISATION =====
    doc.setTextColor(NAVY);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(bien.nom, margin, y);
    y += 6.5;

    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#666666");
    doc.text(bien.localisation, margin, y);
    y += 9;

    // ===== BADGES =====
    doc.setFillColor(GOLD);
    doc.roundedRect(margin, y - 5, 32, 7, 2, 2, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY);
    doc.text(bien.service === "LOCATION" ? "À louer" : "À vendre", margin + 4, y);

    doc.setFillColor("#eeeeee");
    doc.roundedRect(margin + 37, y - 5, 32, 7, 2, 2, "F");
    doc.setTextColor("#333333");
    doc.text(bien.type, margin + 41, y);

    y += 15;

    // ===== PRIX =====
    doc.setFontSize(19);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY);
    doc.text(`${bien.prix.toLocaleString("fr-FR")} DA`, margin, y);

    if (bien.negociable) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(GOLD);
        doc.text("Prix négociable", margin, y + 6);
        y += 6;
    }

    y += 14;

    // ===== INFORMATIONS GÉNÉRALES =====
    doc.setDrawColor("#dddddd");
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY);
    doc.text("Informations générales", margin, y);
    y += 8;

    const infos: [string, string][] = [
        ["Superficie", `${bien.superficie} m²`],
        ["Type", bien.type],
        ["Service", bien.service === "LOCATION" ? "Location" : "Vente"],
        ["Statut", bien.statut || "—"],
    ];

    doc.setFontSize(10.5);
    infos.forEach(([label, value], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = margin + col * 90;
        const rowY = y + row * 8;

        doc.setFont("helvetica", "bold");
        doc.setTextColor("#555555");
        doc.text(`${label} :`, x, rowY);

        doc.setFont("helvetica", "normal");
        doc.setTextColor("#222222");
        doc.text(value, x + 32, rowY);
    });

    y += Math.ceil(infos.length / 2) * 8 + 10;

    // ===== DESCRIPTION =====
    y = checkPageBreak(doc, y, 30);
    doc.setDrawColor("#dddddd");
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY);
    doc.text("Description", margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#333333");

    const descLines = doc.splitTextToSize(bien.description, pageWidth - margin * 2);
    descLines.forEach((line: string) => {
        y = checkPageBreak(doc, y);
        doc.text(line, margin, y);
        y += 5;
    });
    y += 6;

    // ===== CARACTÉRISTIQUES =====
    if (bien.features.length > 0) {
        y = checkPageBreak(doc, y, 25);
        doc.setDrawColor("#dddddd");
        doc.line(margin, y, pageWidth - margin, y);
        y += 9;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(NAVY);
        doc.text("Caractéristiques", margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#333333");

        bien.features.forEach((f) => {
            y = checkPageBreak(doc, y);
            const lines = doc.splitTextToSize(`•  ${f}`, pageWidth - margin * 2);
            doc.text(lines, margin, y);
            y += lines.length * 5.5;
        });
    }

    // ===== PIED DE PAGE (toutes les pages) =====
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor("#999999");
        doc.text(
            "Document généré automatiquement — informations non contractuelles",
            margin,
            290
        );
        doc.text(`Page ${i}/${pageCount}`, pageWidth - margin, 290, { align: "right" });
    }

    doc.save(`bien-${bien.nom.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}; 