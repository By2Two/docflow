import { Component, inject, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DocBlock } from "../../models/block.model";
import { DocumentService } from "../../services/document.service";
import { LocaleService } from "../../services/locale.service";

@Component({
  selector: "app-block",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./block.component.html",
  styleUrl: "./block.component.css",
})
export class BlockComponent {
  readonly block = input.required<DocBlock>();
  readonly stepNumber = input<number>(0);
  readonly isFirst = input<boolean>(false);
  readonly isLast = input<boolean>(false);

  readonly addAfter = output<void>();
  readonly dragStart = output<DragEvent>();
  readonly dragOver = output<DragEvent>();
  readonly drop = output<DragEvent>();
  readonly dragEnd = output<void>();

  readonly document = inject(DocumentService);
  readonly locale = inject(LocaleService);

  get translations() {
    return this.locale.translations();
  }

  remove(): void {
    this.document.removeBlock(this.block().id);
  }
  moveUp(): void {
    this.document.moveBlock(this.block().id, -1);
  }
  moveDown(): void {
    this.document.moveBlock(this.block().id, 1);
  }

  toggleStep() {
    this.document.updateBlock(this.block().id, {
      showStep: this.block().showStep === false ? true : false,
    });
  }

  updateTitle(value: string) {
    this.document.updateBlock(this.block().id, { title: value });
  }
  updateContent(value: string) {
    this.document.updateBlock(this.block().id, { content: value });
  }
  updateCaption(value: string) {
    this.document.updateBlock(this.block().id, { caption: value });
  }
  updateVideoUrl(value: string) {
    this.document.updateBlock(this.block().id, { videoUrl: value });
  }

  onImageFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) =>
      this.document.updateBlock(this.block().id, {
        imageData: loadEvent.target?.result as string,
      });
    reader.readAsDataURL(file);
  }

  getEmbedUrl(url: string): string {
    const youtubeMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  }

  get badgeClass(): string {
    const map: Record<string, string> = {
      image: "img",
      video: "vid",
      tip: "tip",
      warning: "warn",
      separator: "sep",
    };
    return map[this.block().type] || "";
  }

  get badgeLabel(): string {
    const badges = this.translations.block.badges as Record<string, string>;
    return badges[this.block().type] || "";
  }

  autoResize(element: HTMLTextAreaElement): void {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  onDragStart(event: DragEvent): void {
    this.dragStart.emit(event);
  }
  onDragOver(event: DragEvent): void {
    this.dragOver.emit(event);
  }
  onDrop(event: DragEvent): void {
    this.drop.emit(event);
  }
  onDragEnd(): void {
    this.dragEnd.emit();
  }
}
