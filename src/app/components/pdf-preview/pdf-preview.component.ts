import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentService } from "../../services/document.service";
import { LocaleService } from "../../services/locale.service";
import { DOC_STYLES } from "../../models/block.model";

@Component({
  selector: "app-pdf-preview",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./pdf-preview.component.html",
  styleUrl: "./pdf-preview.component.css",
})
export class PdfPreviewComponent {
  readonly document = inject(DocumentService);
  readonly locale = inject(LocaleService);

  get translations() {
    return this.locale.translations();
  }
  get config() {
    return this.document.config();
  }
  get blocks() {
    return this.document.blocks();
  }
  get style() {
    return DOC_STYLES[this.config.style];
  }

  get date(): string {
    const dateLocale = this.locale.locale() === "pt" ? "pt-BR" : "en-US";
    return new Date().toLocaleDateString(dateLocale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  getStepNumber(id: number): number {
    return this.document.getStepNumber(id);
  }
}
