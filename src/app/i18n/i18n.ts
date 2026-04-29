export type Locale = "pt" | "en";

export interface Translations {
  sidebar: {
    document: string;
    logo: string;
    clickToUpload: string;
    image: string;
    fileTypes: string;
    name: string;
    namePlaceholder: string;
    documentTitle: string;
    documentTitlePlaceholder: string;
    subtitleVersion: string;
    subtitlePlaceholder: string;
    author: string;
    authorPlaceholder: string;
    documentStyle: string;
    addBlock: string;
  };
  header: {
    untitled: string;
    block: string;
    blocks: string;
    preview: string;
    export: string;
  };
  block: {
    stepTitle: string;
    moveUp: string;
    moveDown: string;
    addAfter: string;
    remove: string;
    stepOn: string;
    stepOff: string;
    textPlaceholder: string;
    clickToLoadImage: string;
    imageHint: string;
    captionPlaceholder: string;
    videoUrlPlaceholder: string;
    tipPlaceholder: string;
    warningPlaceholder: string;
    sectionDefault: string;
    badges: {
      text: string;
      image: string;
      video: string;
      tip: string;
      warning: string;
      separator: string;
    };
  };
  timeline: {
    emptyMessage: string;
    addBlock: string;
    quickText: string;
    quickImage: string;
    quickTip: string;
  };
  preview: {
    header: string;
    untitled: string;
    author: string;
    date: string;
    steps: string;
    emptyHint: string;
    sectionDefault: string;
    step: string;
    untitledStep: string;
    videoNoUrl: string;
    footer: string;
    page: string;
  };
  exportModal: {
    title: string;
    paperFormat: string;
    a4: string;
    letter: string;
    orientation: string;
    portrait: string;
    landscape: string;
    includeDate: string;
    yes: string;
    no: string;
    watermark: string;
    watermarkPlaceholder: string;
    blocks: string;
    steps: string;
    style: string;
    cancel: string;
    generate: string;
    generating: string;
  };
  toast: {
    addBlocksFirst: string;
    exportSuccess: string;
    exportError: string;
  };
  styles: {
    documentation: string;
    meeting: string;
    tutorial: string;
    report: string;
    process: string;
  };
  blockTypes: {
    text: string;
    image: string;
    tip: string;
    warning: string;
    separator: string;
    video: string;
  };
  pdf: {
    author: string;
    date: string;
    totalSteps: string;
    footer: string;
    pageLabel: string;
    sectionDefault: string;
    untitledStep: string;
    videoLabel: string;
    badges: {
      text: string;
      image: string;
      video: string;
      tip: string;
      warning: string;
    };
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  pt: {
    sidebar: {
      document: "Documento",
      logo: "Logo",
      clickToUpload: "Clique para enviar",
      image: "imagem",
      fileTypes: "PNG, JPG, SVG",
      name: "Nome",
      namePlaceholder: "Ex: João Silva ou Empresa",
      documentTitle: "Título do documento",
      documentTitlePlaceholder: "Ex: Manual de Onboarding",
      subtitleVersion: "Subtítulo / Versão",
      subtitlePlaceholder: "Ex: v1.0 - Janeiro 2026",
      author: "Autor",
      authorPlaceholder: "Ex: João Silva",
      documentStyle: "Estilo do documento",
      addBlock: "Adicionar bloco",
    },
    header: {
      untitled: "Documento sem título",
      block: "bloco",
      blocks: "blocos",
      preview: "Prévia PDF",
      export: "Exportar PDF",
    },
    block: {
      stepTitle: "Título do passo",
      moveUp: "Mover para cima",
      moveDown: "Mover para baixo",
      addAfter: "Adicionar bloco após",
      remove: "Remover bloco",
      stepOn: "Remover numeração de passo",
      stepOff: "Adicionar numeração de passo",
      textPlaceholder: "Descreva este passo...",
      clickToLoadImage: "Clique para carregar imagem",
      imageHint: "PNG, JPG, WebP, GIF",
      captionPlaceholder: "Legenda da imagem (opcional)",
      videoUrlPlaceholder: "URL do vídeo (YouTube, Vimeo...)",
      tipPlaceholder: "Escreva uma dica útil...",
      warningPlaceholder: "Escreva um aviso ou alerta...",
      sectionDefault: "SEÇÃO",
      badges: {
        text: "Texto",
        image: "Imagem",
        video: "Vídeo",
        tip: "Dica",
        warning: "Atenção",
        separator: "Seção",
      },
    },
    timeline: {
      emptyMessage:
        "Adicione blocos pelo painel lateral para montar seu manual passo a passo.",
      addBlock: "Adicionar bloco",
      quickText: "Texto",
      quickImage: "Imagem",
      quickTip: "Dica",
    },
    preview: {
      header: "Prévia do PDF",
      untitled: "Sem título",
      author: "Autor",
      date: "Data",
      steps: "Passos",
      emptyHint: "Nenhum bloco adicionado",
      sectionDefault: "SEÇÃO",
      step: "Passo",
      untitledStep: "(sem título)",
      videoNoUrl: "Vídeo sem URL",
      footer: "DocFlow · Gerado automaticamente",
      page: "Página 1",
    },
    exportModal: {
      title: "Exportar PDF",
      paperFormat: "Formato do papel",
      a4: "A4 (210 × 297mm)",
      letter: "Letter (216 × 279mm)",
      orientation: "Orientação",
      portrait: "Retrato",
      landscape: "Paisagem",
      includeDate: "Incluir data de geração",
      yes: "Sim",
      no: "Não",
      watermark: "Marca d'água (opcional)",
      watermarkPlaceholder: "Ex: CONFIDENCIAL",
      blocks: "Blocos",
      steps: "Passos",
      style: "Estilo",
      cancel: "Cancelar",
      generate: "Gerar PDF",
      generating: "Gerando...",
    },
    toast: {
      addBlocksFirst: "Adicione blocos antes de exportar!",
      exportSuccess: "PDF exportado com sucesso! 🎉",
      exportError: "Erro ao gerar PDF.",
    },
    styles: {
      documentation: "Documentação",
      meeting: "Ata",
      tutorial: "Tutorial",
      report: "Relatório",
      process: "Processo",
    },
    blockTypes: {
      text: "Texto",
      image: "Imagem",
      tip: "Dica",
      warning: "Atenção",
      separator: "Separador",
      video: "Vídeo",
    },
    pdf: {
      author: "AUTOR",
      date: "DATA",
      totalSteps: "TOTAL DE PASSOS",
      footer: "DocFlow · Gerado automaticamente",
      pageLabel: "Página",
      sectionDefault: "SEÇÃO",
      untitledStep: "(sem título)",
      videoLabel: "Vídeo: ",
      badges: {
        text: "TEXTO",
        image: "IMAGEM",
        video: "VÍDEO",
        tip: "DICA",
        warning: "ATENÇÃO",
      },
    },
  },

  en: {
    sidebar: {
      document: "Document",
      logo: "Logo",
      clickToUpload: "Click to upload",
      image: "image",
      fileTypes: "PNG, JPG, SVG",
      name: "Name",
      namePlaceholder: "e.g. John Smith or Company",
      documentTitle: "Document title",
      documentTitlePlaceholder: "e.g. Onboarding Manual",
      subtitleVersion: "Subtitle / Version",
      subtitlePlaceholder: "e.g. v1.0 - January 2026",
      author: "Author",
      authorPlaceholder: "e.g. John Smith",
      documentStyle: "Document style",
      addBlock: "Add block",
    },
    header: {
      untitled: "Untitled document",
      block: "block",
      blocks: "blocks",
      preview: "PDF Preview",
      export: "Export PDF",
    },
    block: {
      stepTitle: "Step title",
      moveUp: "Move up",
      moveDown: "Move down",
      addAfter: "Add block after",
      remove: "Remove block",
      stepOn: "Remove step number",
      stepOff: "Add step number",
      textPlaceholder: "Describe this step...",
      clickToLoadImage: "Click to load image",
      imageHint: "PNG, JPG, WebP, GIF",
      captionPlaceholder: "Image caption (optional)",
      videoUrlPlaceholder: "Video URL (YouTube, Vimeo...)",
      tipPlaceholder: "Write a useful tip...",
      warningPlaceholder: "Write a warning or alert...",
      sectionDefault: "SECTION",
      badges: {
        text: "Text",
        image: "Image",
        video: "Video",
        tip: "Tip",
        warning: "Warning",
        separator: "Section",
      },
    },
    timeline: {
      emptyMessage:
        "Add blocks from the side panel to build your step-by-step manual.",
      addBlock: "Add block",
      quickText: "Text",
      quickImage: "Image",
      quickTip: "Tip",
    },
    preview: {
      header: "PDF Preview",
      untitled: "Untitled",
      author: "Author",
      date: "Date",
      steps: "Steps",
      emptyHint: "No blocks added",
      sectionDefault: "SECTION",
      step: "Step",
      untitledStep: "(untitled)",
      videoNoUrl: "Video without URL",
      footer: "DocFlow · Auto-generated",
      page: "Page 1",
    },
    exportModal: {
      title: "Export PDF",
      paperFormat: "Paper format",
      a4: "A4 (210 × 297mm)",
      letter: "Letter (216 × 279mm)",
      orientation: "Orientation",
      portrait: "Portrait",
      landscape: "Landscape",
      includeDate: "Include generation date",
      yes: "Yes",
      no: "No",
      watermark: "Watermark (optional)",
      watermarkPlaceholder: "e.g. CONFIDENTIAL",
      blocks: "Blocks",
      steps: "Steps",
      style: "Style",
      cancel: "Cancel",
      generate: "Generate PDF",
      generating: "Generating...",
    },
    toast: {
      addBlocksFirst: "Add blocks before exporting!",
      exportSuccess: "PDF exported successfully! 🎉",
      exportError: "Error generating PDF.",
    },
    styles: {
      documentation: "Documentation",
      meeting: "Meeting Notes",
      tutorial: "Tutorial",
      report: "Report",
      process: "Process",
    },
    blockTypes: {
      text: "Text",
      image: "Image",
      tip: "Tip",
      warning: "Warning",
      separator: "Separator",
      video: "Video",
    },
    pdf: {
      author: "AUTHOR",
      date: "DATE",
      totalSteps: "TOTAL STEPS",
      footer: "DocFlow · Auto-generated",
      pageLabel: "Page",
      sectionDefault: "SECTION",
      untitledStep: "(untitled)",
      videoLabel: "Video: ",
      badges: {
        text: "TEXT",
        image: "IMAGE",
        video: "VIDEO",
        tip: "TIP",
        warning: "WARNING",
      },
    },
  },
};
