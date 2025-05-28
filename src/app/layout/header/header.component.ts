import { Component, inject } from '@angular/core';
import { MobileMenuButtonComponent } from '@shared/components/buttons/mobile-menu/mobile-menu-button.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { SocialLinksComponent } from '@shared/components/social-links/social-links.component';
import { ActionLinksComponent } from '@shared/components/action-links/action-links.component';
import { HeaderLoginButtonComponent } from './login-button/header-login-button.component';
import { SearchBarComponent } from '@features/anime/components/search-bar/search-bar.component';
import { UserProfileCircleComponent } from '@features/user/components/profile-circle/user-profile-circle.component';
import { SessionService } from '@core/services/api/auth/session.service';
import { ThemeConfiguratorComponent } from './theme-configurator/theme-configurator.component';

@Component({
  selector: 'app-header',
  imports: [
    MobileMenuButtonComponent,
    LogoComponent,
    SearchBarComponent,
    SocialLinksComponent,
    ActionLinksComponent,
    HeaderLoginButtonComponent,
    UserProfileCircleComponent,
    ThemeConfiguratorComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly sessionService: SessionService = inject(SessionService);
}
