import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterModule],
  template: `
    <a [routerLink]="['/']">
      <img src="assets/icons/logo.svg" alt="Logo" />
    </a>
  `,
  styles: [
    `
      img {
        height: 40px;
        color: var(--text-first);
      }
    `,
  ],
})
export class LogoComponent {}
