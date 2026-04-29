import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SupabaseService } from "../../services/supabase.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private supabase = inject(SupabaseService);

  email = "";
  password = "";
  confirmPassword = "";
  isSignUp = false;
  loading = signal(false);
  error = signal("");

  async submit() {
    this.error.set("");

    if (this.isSignUp && this.password !== this.confirmPassword) {
      this.error.set("As senhas não coincidem.");
      return;
    }

    this.loading.set(true);
    const authFunction = this.isSignUp
      ? this.supabase.signUp(this.email, this.password)
      : this.supabase.signIn(this.email, this.password);

    const { error } = await authFunction;
    this.loading.set(false);

    if (error) {
      this.error.set(error.message);
    } else if (this.isSignUp) {
      this.error.set("Verifique seu e-mail para confirmar o cadastro.");
    }
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.confirmPassword = "";
    this.error.set("");
  }
}
