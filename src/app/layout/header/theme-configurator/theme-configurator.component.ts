import { Component, inject, signal, HostListener } from '@angular/core';
import { ThemeService } from '@core/services/data/theme.service';
import { LucideAngularModule, PaletteIcon, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-theme-configurator',
  imports: [LucideAngularModule],
  templateUrl: './theme-configurator.component.html',
  styleUrl: './theme-configurator.component.scss',
})
export class ThemeConfiguratorComponent {
  themeService = inject(ThemeService);

  isMenuVisible = signal(false);

  toggleMenu(): void {
    this.isMenuVisible.update((visible) => !visible);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-theme-configurator')) {
      this.isMenuVisible.set(false);
    }
  }

  readonly XIcon = XIcon;
  readonly PaletteIcon = PaletteIcon;
}
