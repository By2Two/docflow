import { Injectable, inject } from "@angular/core";
import {
  DocBlock,
  DocConfig,
  DOC_STYLES,
  ExportOptions,
} from "../models/block.model";
import { LocaleService } from "./locale.service";

@Injectable({ providedIn: "root" })
export class PdfService {
  private readonly locale = inject(LocaleService);

  async export(
    blocks: DocBlock[],
    config: DocConfig,
    options: ExportOptions,
  ): Promise<void> {
    const translations = this.locale.translations();
    const jspdf = await import("jspdf");
    const { jsPDF } = jspdf;

    const pdf = new jsPDF({
      orientation: options.orientation,
      format: options.format,
      unit: "mm",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    const style = DOC_STYLES[config.style];

    const hex = style.color.replace("#", "");
    const accentRed = parseInt(hex.slice(0, 2), 16);
    const accentGreen = parseInt(hex.slice(2, 4), 16);
    const accentBlue = parseInt(hex.slice(4, 6), 16);

    const dateLocale = this.locale.locale() === "pt" ? "pt-BR" : "en-US";
    const date = new Date().toLocaleDateString(dateLocale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    pdf.setFillColor(accentRed, accentGreen, accentBlue);
    pdf.rect(0, 0, pageWidth, 40, "F");

    let headerTextX = margin;

    if (config.logoData) {
      try {
        pdf.addImage(config.logoData, "PNG", margin, 8, 24, 24);
        headerTextX = margin + 28;
      } catch (_error) {}
    }

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "normal");
    const metaLine = [translations.styles[config.style], config.company]
      .filter(Boolean)
      .join(" · ")
      .toUpperCase();
    pdf.text(metaLine, headerTextX, 13);

    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(config.title || translations.header.untitled, headerTextX, 23, {
      maxWidth: pageWidth - headerTextX - margin,
    });

    if (config.subtitle) {
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text(config.subtitle, headerTextX, 31);
    }

    pdf.setFillColor(248, 248, 246);
    pdf.rect(0, 40, pageWidth, 13, "F");
    pdf.setDrawColor(225, 225, 220);
    pdf.setLineWidth(0.3);
    pdf.line(0, 40, pageWidth, 40);
    pdf.line(0, 53, pageWidth, 53);

    let metaX = margin;
    pdf.setFontSize(7);
    if (config.author) {
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(130, 130, 120);
      pdf.text(translations.pdf.author, metaX, 45.5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(50, 50, 45);
      pdf.text(config.author, metaX, 50);
      metaX += 55;
    }
    if (options.includeDate) {
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(130, 130, 120);
      pdf.text(translations.pdf.date, metaX, 45.5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(50, 50, 45);
      pdf.text(date, metaX, 50);
      metaX += 55;
    }
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(130, 130, 120);
    pdf.text(translations.pdf.totalSteps, metaX, 45.5);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(50, 50, 45);
    pdf.text(
      String(
        blocks.filter(
          (block) => block.type !== "separator" && block.showStep !== false,
        ).length,
      ),
      metaX,
      50,
    );

    let y = 60;
    const lineHeight = 5.5;
    let pageNum = 1;

    const addFooter = () => {
      pdf.setFillColor(accentRed, accentGreen, accentBlue);
      pdf.rect(0, pageHeight - 10, pageWidth, 10, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `${translations.pdf.pageLabel} ${pageNum}`,
        pageWidth - margin,
        pageHeight - 3.5,
        { align: "right" },
      );
    };

    const addWatermark = () => {
      if (!options.watermark) {
        return;
      }
      pdf.saveGraphicsState();
      pdf.setGState(pdf.GState({ opacity: 0.07 }));
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(42);
      pdf.setFont("helvetica", "bold");
      pdf.text(options.watermark, pageWidth / 2, pageHeight / 2, {
        align: "center",
        angle: 45,
      });
      pdf.restoreGraphicsState();
    };

    const checkPage = (needed = 20) => {
      if (y + needed > pageHeight - 18) {
        addFooter();
        pdf.addPage();
        pageNum++;
        y = 16;
        addWatermark();
      }
    };

    addWatermark();

    let stepNum = 0;

    for (const block of blocks) {
      if (block.type === "separator") {
        checkPage(20);
        pdf.setDrawColor(200, 200, 195);
        pdf.setLineWidth(0.4);
        pdf.setLineDashPattern([2, 2], 0);
        pdf.line(margin, y, pageWidth - margin, y);
        pdf.setLineDashPattern([], 0);
        const label = (
          block.title || translations.pdf.sectionDefault
        ).toUpperCase();
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(160, 160, 150);
        const labelWidth = pdf.getTextWidth(label);
        pdf.setFillColor(255, 255, 255);
        pdf.rect(
          pageWidth / 2 - labelWidth / 2 - 5,
          y - 3.5,
          labelWidth + 10,
          7,
          "F",
        );
        pdf.text(label, pageWidth / 2, y + 0.5, { align: "center" });
        y += 14;
        continue;
      }

      if (block.showStep !== false) {
        stepNum++;
      }
      checkPage(28);

      if (block.showStep !== false) {
        pdf.setFillColor(accentRed, accentGreen, accentBlue);
        pdf.circle(margin + 4, y + 4, 4.5, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text(String(stepNum), margin + 4, y + 5.8, { align: "center" });
      } else {
        pdf.setFillColor(220, 220, 216);
        pdf.circle(margin + 4, y + 4, 4.5, "F");
      }

      const badgeText =
        (translations.pdf.badges as Record<string, string>)[block.type] || "";
      pdf.setFontSize(6.5);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(accentRed, accentGreen, accentBlue);
      pdf.text(badgeText, margin + 13, y + 2.5);

      const titleText = block.title || translations.pdf.untitledStep;
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(20, 20, 18);
      const titleLines = pdf.splitTextToSize(titleText, contentWidth - 13);
      pdf.text(titleLines, margin + 13, y + 9);
      y += 9 + titleLines.length * 5.5;

      if (block.type === "text" && block.content) {
        const lines = pdf.splitTextToSize(block.content, contentWidth - 13);
        checkPage(lines.length * lineHeight + 6);
        pdf.setFontSize(9.5);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(70, 70, 65);
        pdf.text(lines, margin + 13, y + lineHeight);
        y += lines.length * lineHeight + 8;
      }

      if ((block.type === "tip" || block.type === "warning") && block.content) {
        const lines = pdf.splitTextToSize(block.content, contentWidth - 20);
        const boxHeight = lines.length * lineHeight + 8;
        checkPage(boxHeight + 4);

        if (block.type === "tip") {
          pdf.setFillColor(232, 243, 239);
          pdf.setDrawColor(accentRed, accentGreen, accentBlue);
          pdf.setTextColor(30, 74, 60);
        } else {
          pdf.setFillColor(253, 240, 232);
          pdf.setDrawColor(224, 122, 48);
          pdf.setTextColor(122, 59, 13);
        }
        pdf.setLineWidth(0.8);
        pdf.rect(margin + 13, y, contentWidth - 13, boxHeight, "F");
        pdf.line(margin + 13, y, margin + 13, y + boxHeight);
        pdf.setFontSize(9.5);
        pdf.setFont("helvetica", "normal");
        pdf.text(lines, margin + 17, y + lineHeight + 1);
        y += boxHeight + 6;
      }

      if (block.type === "image" && block.imageData) {
        checkPage(60);
        const imageWidth = contentWidth - 13;
        const imageHeight = 58;
        try {
          pdf.addImage(
            block.imageData,
            "PNG",
            margin + 13,
            y,
            imageWidth,
            imageHeight,
            "",
            "FAST",
          );
          pdf.setDrawColor(220, 220, 218);
          pdf.setLineWidth(0.3);
          pdf.rect(margin + 13, y, imageWidth, imageHeight);
          y += imageHeight + 4;
        } catch (error) {
          console.warn("Imagem ignorada:", error);
        }
        if (block.caption) {
          pdf.setFontSize(7.5);
          pdf.setFont("helvetica", "italic");
          pdf.setTextColor(150, 150, 145);
          pdf.text(block.caption, pageWidth / 2, y, { align: "center" });
          y += 5;
        }
      }

      if (block.type === "video") {
        checkPage(14);
        pdf.setFillColor(253, 232, 232);
        pdf.setDrawColor(180, 60, 60);
        pdf.setLineWidth(0.5);
        const boxHeight = 12;
        pdf.rect(margin + 13, y, contentWidth - 13, boxHeight, "F");
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(120, 30, 30);
        pdf.text(translations.pdf.videoLabel, margin + 17, y + 8);
        const labelWidth = pdf.getTextWidth(translations.pdf.videoLabel);
        const url = block.videoUrl || block.title || "";
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 200);
        if (block.videoUrl) {
          pdf.textWithLink(url, margin + 17 + labelWidth, y + 8, {
            url: block.videoUrl,
          });
        } else {
          pdf.text(url, margin + 17 + labelWidth, y + 8);
        }
        y += boxHeight + 6;
      }

      pdf.setDrawColor(235, 235, 232);
      pdf.setLineWidth(0.3);
      pdf.line(margin + 13, y, pageWidth - margin, y);
      y += 9;
    }

    addFooter();

    const isoDate = new Date().toISOString().slice(0, 10);
    const filename =
      (config.title || "documento").replace(/\s+/g, "_") +
      "-" +
      isoDate +
      ".pdf";
    pdf.save(filename);
  }
}
