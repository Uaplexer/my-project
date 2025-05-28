import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from './session.service';
import { AuthModalComponent } from '@shared/components/auth-modal/auth-modal.component';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from './auth.service';
import {
  UserLoginRequest,
  UserRegisterRequest,
} from '@features/user/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthFlowService {
  private dialog = inject(MatDialog);
  private sessionService = inject(SessionService);
  private authService = inject(AuthService);

  private currentDialogRef?: MatDialogRef<AuthModalComponent>;

  private destroy$ = new Subject<void>();

  openAuthModal(): void {
    if (this.currentDialogRef) return;

    this.currentDialogRef = this.dialog.open(AuthModalComponent, {
      disableClose: false,
      width: '480px',
      backdropClass: 'backdrop-blur',
    });

    this.currentDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentDialogRef = undefined;
      });
  }

  closeAuthModal(): void {
    this.currentDialogRef?.close();
    this.currentDialogRef = undefined;
  }

  handleLogin(credentials: UserLoginRequest): Observable<void> {
    return this.authService.login(credentials).pipe(
      tap((response) =>
        this.sessionService.initializeOnSuccessfulAuth(response.token),
      ),
      map(() => void 0),
    );
  }

  handleRegister(data: UserRegisterRequest): Observable<void> {
    return this.authService.register(data).pipe(
      tap((response) =>
        this.sessionService.initializeOnSuccessfulAuth(response.token),
      ),
      map(() => void 0),
    );
  }
}
