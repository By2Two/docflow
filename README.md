# DocFlow — Documentação Automática de Processos

SaaS de geração de manuais passo a passo com exportação para PDF.

## Stack

- **Angular 20** (Standalone Components, Signals)
- **jsPDF** para exportação PDF
- Sem backend — 100% client-side

## Instalação

```bash
npm install
npm start
```

Acesse `http://localhost:4200`

## Build para produção

```bash
npm run build
```

## Estrutura de componentes

```
src/app/
├── models/
│   └── block.model.ts          # Tipos: DocBlock, DocConfig, DocStyle
├── services/
│   ├── document.service.ts     # Estado global com Signals
│   ├── pdf.service.ts          # Geração PDF via jsPDF
│   └── toast.service.ts        # Notificações
└── components/
    ├── header/                 # Barra superior
    ├── sidebar/                # Config + adicionar blocos
    ├── timeline/               # Lista de blocos (drag & drop)
    ├── block/                  # Card de bloco individual
    ├── pdf-preview/            # Painel de prévia
    └── export-modal/           # Modal de exportação
```

## Tipos de bloco

| Tipo       | Descrição                        |
|------------|----------------------------------|
| `text`     | Parágrafo de texto               |
| `image`    | Upload de imagem com legenda     |
| `video`    | Embed YouTube / Vimeo            |
| `tip`      | Caixa de dica (verde)            |
| `warning`  | Caixa de aviso (laranja)         |
| `separator`| Divisor de seção                 |

## Estilos de documento

- 📄 Documentação Técnica
- 📋 Ata de Reunião
- 🎓 Tutorial
- 📊 Relatório
- ⚙️ Processo Operacional

## Próximos passos sugeridos

- Persistência no LocalStorage / Supabase
- Templates prontos por categoria
- Colaboração em tempo real
- Exportação para DOCX
- Upload de vídeo local (preview antes do PDF)
