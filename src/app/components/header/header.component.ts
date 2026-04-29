import { Component, inject, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentService } from "../../services/document.service";
import { LocaleService } from "../../services/locale.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  readonly document = inject(DocumentService);
  readonly locale = inject(LocaleService);
  readonly previewToggle = output<void>();
  readonly exportClick = output<void>();

  get translations() {
    return this.locale.translations();
  }

  onPreview(): void {
    this.previewToggle.emit();
  }
  onExport(): void {
    this.exportClick.emit();
  }
}
