import { Component } from '@angular/core';
import { LucideAngularModule, MenuIcon } from 'lucide-angular';

@Component({
  selector: 'mobile-menu-button',
  imports: [LucideAngularModule],
  template: `
    <button>
      <lucide-icon [img]="MenuIcon" name="menu" />
    </button>
  `,
})
export class MobileMenuButtonComponent {
  readonly MenuIcon = MenuIcon;
}
