import { Component, inject, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DocumentService } from "../../services/document.service";
import { PdfService } from "../../services/pdf.service";
import { ToastService } from "../../services/toast.service";
import { LocaleService } from "../../services/locale.service";
import { ExportOptions } from "../../models/block.model";

@Component({
  selector: "app-export-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./export-modal.component.html",
  styleUrl: "./export-modal.component.css",
})
export class ExportModalComponent {
  readonly close = output<void>();

  readonly document = inject(DocumentService);
  readonly pdfService = inject(PdfService);
  readonly toast = inject(ToastService);
  readonly locale = inject(LocaleService);

  get translations() {
    return this.locale.translations();
  }

  options: ExportOptions = {
    format: "a4",
    orientation: "portrait",
    includeDate: true,
    watermark: "",
  };

  isGenerating = false;

  async generate(): Promise<void> {
    this.isGenerating = true;
    try {
      await this.pdfService.export(
        this.document.blocks(),
        this.document.config(),
        this.options,
      );
      this.toast.show(this.translations.toast.exportSuccess);
      this.close.emit();
    } catch (error) {
      console.error(error);
      this.toast.show(this.translations.toast.exportError, "error");
    } finally {
      this.isGenerating = false;
    }
  }
}
