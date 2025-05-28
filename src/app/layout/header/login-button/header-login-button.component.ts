import { Component, inject } from '@angular/core';
import { AuthFlowService } from '@core/services/api/auth/auth-flow.service';

@Component({
  selector: 'app-header-login-button',
  templateUrl: './header-login-button.component.html',
  styleUrl: './header-login-button.component.scss',
})
export class HeaderLoginButtonComponent {
  readonly authFlowService = inject(AuthFlowService);

  onLoginClick(): void {
    this.authFlowService.openAuthModal();
  }
}
