import { Injectable, signal, computed } from "@angular/core";
import { Locale, TRANSLATIONS } from "../i18n/i18n";

@Injectable({ providedIn: "root" })
export class LocaleService {
  private _locale = signal<Locale>("pt");
  readonly locale = this._locale.asReadonly();
  readonly translations = computed(() => TRANSLATIONS[this._locale()]);

  toggle(): void {
    this._locale.update((currentLocale) =>
      currentLocale === "pt" ? "en" : "pt",
    );
  }
}
