import { Injectable, signal, computed } from "@angular/core";
import {
  DocBlock,
  BlockType,
  DocConfig,
  DocStyle,
} from "../models/block.model";

@Injectable({ providedIn: "root" })
export class DocumentService {
  private _blocks = signal<DocBlock[]>([]);
  private _config = signal<DocConfig>({
    title: "",
    subtitle: "",
    company: "",
    author: "",
    style: "documentation",
    logoData: null,
  });
  private _idCounter = 0;

  readonly blocks = this._blocks.asReadonly();
  readonly config = this._config.asReadonly();
  readonly blockCount = computed(() => this._blocks().length);
  readonly stepCount = computed(
    () =>
      this._blocks().filter(
        (block) => block.type !== "separator" && block.showStep !== false,
      ).length,
  );

  addBlock(type: BlockType, afterId?: number): void {
    const block: DocBlock = {
      id: ++this._idCounter,
      type,
      title: "",
      content: "",
      imageData: null,
      caption: "",
      videoUrl: "",
    };

    this._blocks.update((blocks) => {
      if (afterId !== undefined) {
        const index = blocks.findIndex((block) => block.id === afterId);
        const updated = [...blocks];
        updated.splice(index + 1, 0, block);
        return updated;
      }
      return [...blocks, block];
    });
  }

  removeBlock(id: number): void {
    this._blocks.update((blocks) => blocks.filter((block) => block.id !== id));
  }

  updateBlock(id: number, patch: Partial<DocBlock>): void {
    this._blocks.update((blocks) =>
      blocks.map((block) => (block.id === id ? { ...block, ...patch } : block)),
    );
  }

  moveBlock(id: number, direction: -1 | 1): void {
    this._blocks.update((blocks) => {
      const index = blocks.findIndex((block) => block.id === id);
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= blocks.length) {
        return blocks;
      }
      const updated = [...blocks];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }

  reorderBlocks(fromId: number, toId: number): void {
    this._blocks.update((blocks) => {
      const fromIndex = blocks.findIndex((block) => block.id === fromId);
      const toIndex = blocks.findIndex((block) => block.id === toId);
      const updated = [...blocks];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }

  updateConfig(patch: Partial<DocConfig>): void {
    this._config.update((config) => ({ ...config, ...patch }));
  }

  setStyle(style: DocStyle): void {
    this._config.update((config) => ({ ...config, style }));
  }

  setLogo(data: string | null): void {
    this._config.update((config) => ({ ...config, logoData: data }));
  }

  getStepNumber(id: number): number {
    let step = 0;
    for (const block of this._blocks()) {
      if (block.type !== "separator" && block.showStep !== false) {
        step++;
      }
      if (block.id === id) {
        return step;
      }
    }
    return step;
  }

  loadSampleBlocks(): void {
    this._blocks.set([]);
    this._idCounter = 0;
    const samples: Array<Partial<DocBlock> & { type: BlockType }> = [];

    samples.forEach((sample) => {
      const block: DocBlock = {
        id: ++this._idCounter,
        type: sample.type,
        title: sample.title || "",
        content: sample.content || "",
        imageData: sample.imageData || null,
        caption: sample.caption || "",
        videoUrl: sample.videoUrl || "",
      };
      this._blocks.update((blocks) => [...blocks, block]);
    });
  }
}
