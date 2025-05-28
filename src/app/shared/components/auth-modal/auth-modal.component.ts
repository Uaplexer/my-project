import { Component, inject, signal, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFlowService } from '@core/services/api/auth/auth-flow.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { equalValues } from '@shared/forms/validators/equal-values.model';
import { Subject, takeUntil } from 'rxjs';

const MIN_PASSWORD_LENGTH = 6;

@Component({
  selector: 'app-auth-modal',
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent implements OnDestroy {
  authFlowService = inject(AuthFlowService);

  isLoading = signal(false);

  isLoginFailed = signal(false);
  isRegisterFailed = signal(false);

  showRegister = signal(false);

  private destroy$ = new Subject<void>();

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(MIN_PASSWORD_LENGTH),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
        ]),
      },
      [equalValues('password', 'confirmPassword')],
    ),
  });

  get loginCredentials() {
    return {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
  }

  get registerData() {
    return {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.get('passwords.password')?.value!,
    };
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.isLoginFailed.set(true);
      return;
    }
    this.isLoading.set(true);

    this.authFlowService
      .handleLogin(this.loginCredentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.authFlowService.closeAuthModal(),
        error: () => this.isLoginFailed.set(true),
        complete: () => this.isLoading.set(false),
      });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.isRegisterFailed.set(true);
      return;
    }
    this.isLoading.set(true);

    this.authFlowService
      .handleRegister(this.registerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.authFlowService.closeAuthModal(),
        error: () => this.isRegisterFailed.set(true),
        complete: () => this.isLoading.set(false),
      });
  }
  onClose(): void {
    this.authFlowService.closeAuthModal();
  }

  onShowRegister() {
    this.showRegister.set(true);
  }

  onShowLogin() {
    this.showRegister.set(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
