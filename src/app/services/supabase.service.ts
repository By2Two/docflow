import { Injectable, signal } from "@angular/core";
import { createClient, SupabaseClient, Session } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class SupabaseService {
  private supabase: SupabaseClient;
  readonly session = signal<Session | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
    this.supabase.auth.getSession().then(({ data }) => {
      this.session.set(data.session);
    });
    this.supabase.auth.onAuthStateChange((_, session) => {
      this.session.set(session);
    });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
