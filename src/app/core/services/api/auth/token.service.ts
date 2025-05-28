import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly tokenName = 'aniUniToken';

  get token(): string | null {
    return this.getTokenFromCookies();
  }

  saveToken(token: string): void {
    document.cookie = `${this.tokenName}=${encodeURIComponent(token)};path=/;SameSite=Strict;Secure`;
  }

  clearToken(): void {
    document.cookie = `${this.tokenName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  private getTokenFromCookies(): string | null {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${this.tokenName}=([^;]*)`),
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  parseTokenPayload(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
