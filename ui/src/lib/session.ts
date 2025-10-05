// src/lib/session.ts
import { Api } from "./api";
import type { LoginResponse } from "../models/auth";
import type { User } from "../models/user";

type SessionState = {
  user: User | null;
  accessToken: string | null;
};

export class Session {
  private static state: SessionState = { user: null, accessToken: null };

  static set(login: LoginResponse): void {
    Session.state.user = login.user;
    Session.state.accessToken = login.accessToken;
    Api.setAuthToken(login.accessToken);
  }

  static clear(): void {
    Session.state.user = null;
    Session.state.accessToken = null;
    Api.setAuthToken(null);
  }

  static getUser(): User | null {
    return Session.state.user;
  }

  static getToken(): string | null {
    return Session.state.accessToken;
  }

  static isAuthenticated(): boolean {
    return !!Session.state.user && !!Session.state.accessToken;
  }
}
