export type BlockType =
  | "text"
  | "image"
  | "video"
  | "tip"
  | "warning"
  | "separator";

export interface DocBlock {
  id: number;
  type: BlockType;
  title: string;
  content: string;
  imageData: string | null;
  caption: string;
  videoUrl: string;
  showStep?: boolean;
}

export type DocStyle =
  | "documentation"
  | "meeting"
  | "tutorial"
  | "report"
  | "process";

export interface StyleConfig {
  color: string;
  icon: string;
}

export const DOC_STYLES: Record<DocStyle, StyleConfig> = {
  documentation: { color: "#2A5F4F", icon: "mdi-file-document-outline" },
  meeting: { color: "#2955A3", icon: "mdi-clipboard-list-outline" },
  tutorial: { color: "#6B3EAC", icon: "mdi-school-outline" },
  report: { color: "#9B2828", icon: "mdi-chart-bar" },
  process: { color: "#9B6B1A", icon: "mdi-cog-outline" },
};

export interface DocConfig {
  title: string;
  subtitle: string;
  company: string;
  author: string;
  style: DocStyle;
  logoData: string | null;
}

export interface ExportOptions {
  format: "a4" | "letter";
  orientation: "portrait" | "landscape";
  includeDate: boolean;
  watermark: string;
}
