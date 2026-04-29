import { Injectable, signal } from "@angular/core";

export interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

@Injectable({ providedIn: "root" })
export class ToastService {
  readonly toast = signal<Toast | null>(null);
  private timer: any;

  show(message: string, type: Toast["type"] = "success"): void {
    clearTimeout(this.timer);
    this.toast.set({ message, type });
    this.timer = setTimeout(() => this.toast.set(null), 2800);
  }
}
