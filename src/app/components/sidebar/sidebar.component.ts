import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DocumentService } from "../../services/document.service";
import { LocaleService } from "../../services/locale.service";
import { BlockType, DocStyle, DOC_STYLES } from "../../models/block.model";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  readonly document = inject(DocumentService);
  readonly locale = inject(LocaleService);

  readonly styles = Object.entries(DOC_STYLES) as [
    DocStyle,
    (typeof DOC_STYLES)[DocStyle],
  ][];

  get translations() {
    return this.locale.translations();
  }

  get blockTypes(): Array<{ type: BlockType; icon: string; label: string }> {
    const blockTranslations = this.translations.blockTypes;
    return [
      { type: "text", icon: "mdi-text", label: blockTranslations.text },
      {
        type: "image",
        icon: "mdi-image-outline",
        label: blockTranslations.image,
      },
      {
        type: "tip",
        icon: "mdi-lightbulb-outline",
        label: blockTranslations.tip,
      },
      {
        type: "warning",
        icon: "mdi-alert-outline",
        label: blockTranslations.warning,
      },
      {
        type: "separator",
        icon: "mdi-minus",
        label: blockTranslations.separator,
      },
      {
        type: "video",
        icon: "mdi-video-outline",
        label: blockTranslations.video,
      },
    ];
  }

  addBlock(type: BlockType): void {
    this.document.addBlock(type);
    setTimeout(() => {
      const elements = document.querySelectorAll(".block-title-input");
      const last = elements[elements.length - 1] as
        | HTMLInputElement
        | undefined;
      last?.focus();
    }, 60);
  }

  onLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) =>
      this.document.setLogo(loadEvent.target?.result as string);
    reader.readAsDataURL(file);
  }

  removeLogo(): void {
    this.document.setLogo(null);
  }

  setStyle(style: DocStyle): void {
    this.document.setStyle(style);
  }

  get config() {
    return this.document.config();
  }

  updateTitle(value: string) {
    this.document.updateConfig({ title: value });
  }
  updateSubtitle(value: string) {
    this.document.updateConfig({ subtitle: value });
  }
  updateCompany(value: string) {
    this.document.updateConfig({ company: value });
  }
  updateAuthor(value: string) {
    this.document.updateConfig({ author: value });
  }
}
