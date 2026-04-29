import { Component, inject, signal, OnInit, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { PdfPreviewComponent } from "./components/pdf-preview/pdf-preview.component";
import { ExportModalComponent } from "./components/export-modal/export-modal.component";
import { LoginComponent } from "./components/login/login.component";
import { DocumentService } from "./services/document.service";
import { ToastService } from "./services/toast.service";
import { LocaleService } from "./services/locale.service";
import { SupabaseService } from "./services/supabase.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    TimelineComponent,
    PdfPreviewComponent,
    ExportModalComponent,
    LoginComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  readonly document = inject(DocumentService);
  readonly toastService = inject(ToastService);
  readonly locale = inject(LocaleService);
  readonly supabase = inject(SupabaseService);

  readonly showPreview = signal(false);
  readonly showExportModal = signal(false);

  readonly isAuthenticated = computed(() => !!this.supabase.session());

  ngOnInit(): void {
    this.document.loadSampleBlocks();
  }

  togglePreview(): void {
    this.showPreview.update((current) => !current);
  }

  openExport(): void {
    if (this.document.blockCount() === 0) {
      this.toastService.show(
        this.locale.translations().toast.addBlocksFirst,
        "error",
      );
      return;
    }
    this.showExportModal.set(true);
  }

  closeExport(): void {
    this.showExportModal.set(false);
  }

  get toast() {
    return this.toastService.toast();
  }
}
