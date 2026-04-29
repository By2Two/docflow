import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentService } from "../../services/document.service";
import { LocaleService } from "../../services/locale.service";
import { BlockComponent } from "../block/block.component";
import { BlockType } from "../../models/block.model";

@Component({
  selector: "app-timeline",
  standalone: true,
  imports: [CommonModule, BlockComponent],
  templateUrl: "./timeline.component.html",
  styleUrl: "./timeline.component.css",
})
export class TimelineComponent {
  readonly document = inject(DocumentService);
  readonly locale = inject(LocaleService);
  private dragSrcId: number | null = null;

  get translations() {
    return this.locale.translations();
  }

  get blocks() {
    return this.document.blocks();
  }

  getStepNumber(id: number): number {
    return this.document.getStepNumber(id);
  }

  isFirst(index: number): boolean {
    return index === 0;
  }
  isLast(index: number): boolean {
    return index === this.blocks.length - 1;
  }

  addAfterBlock(id: number): void {
    this.document.addBlock("text", id);
    setTimeout(() => {
      const elements = document.querySelectorAll(".block-title-input");
      const last = elements[elements.length - 1] as
        | HTMLInputElement
        | undefined;
      last?.focus();
    }, 60);
  }

  addFirstBlock(type: BlockType = "text"): void {
    this.document.addBlock(type);
  }

  onDragStart(event: DragEvent, id: number): void {
    this.dragSrcId = id;
    (event.currentTarget as HTMLElement).classList.add("dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  }

  onDragOver(event: DragEvent, id: number): void {
    event.preventDefault();
    if (id === this.dragSrcId) {
      return;
    }
    document
      .querySelectorAll(".block-wrapper")
      .forEach((element) => element.classList.remove("drag-over"));
    (event.currentTarget as HTMLElement).classList.add("drag-over");
  }

  onDrop(event: DragEvent, targetId: number): void {
    event.preventDefault();
    if (this.dragSrcId !== null && this.dragSrcId !== targetId) {
      this.document.reorderBlocks(this.dragSrcId, targetId);
    }
    this.onDragEnd();
  }

  onDragEnd(): void {
    this.dragSrcId = null;
    document
      .querySelectorAll(".block-wrapper, .block-card")
      .forEach((element) => {
        element.classList.remove("drag-over", "dragging");
      });
  }
}
