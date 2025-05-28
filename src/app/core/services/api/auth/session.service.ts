import { Injectable, inject, signal } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, first, of, tap } from 'rxjs';
import { User } from '@features/user/models/user.model';
import { UserService } from '../user.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private tokenService = inject(TokenService);
  private userService = inject(UserService);

  private readonly _user = signal<User | undefined>(undefined);
  private readonly _status = signal<{
    isAuthenticated: boolean;
    isInitialized: boolean;
  }>({
    isAuthenticated: false,
    isInitialized: false,
  });

  readonly user = this._user.asReadonly();
  readonly status = this._status.asReadonly();

  initialize(): void {
    if (this._status().isInitialized) return;
    if (this.tokenService.token === null) {
      this._status.set({
        isAuthenticated: false,
        isInitialized: true,
      });
      return;
    }

    this.initializeUser$().subscribe();
  }

  initializeOnSuccessfulAuth(token: string) {
    this.tokenService.saveToken(token);
    this.initializeUser$().subscribe();
  }

  clearSession(): void {
    this.tokenService.clearToken();
    this._user.set(undefined);
    this._status.set({
      isAuthenticated: false,
      isInitialized: true,
    });
  }

  startSession(user: User): void {
    this._user.set(user);
    this._status.set({
      isAuthenticated: true,
      isInitialized: true,
    });
  }

  private initializeUser$() {
    return this.userService.self$().pipe(
      first(),
      tap((user) => {
        this.startSession(user);
      }),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    );
  }
}
