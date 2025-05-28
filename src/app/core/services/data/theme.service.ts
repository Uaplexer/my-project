import { Injectable, signal } from '@angular/core';
import { Theme, ThemeNames } from '@shared/models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes: Theme[] = [
    { name: 'light', color: '#ffffff' },
    { name: 'dark', color: '#000000' },
    { name: 'solarized', color: '#fdf6e3' },
    { name: 'pink', color: '#ff69b4' },
  ];
  readonly currentTheme = signal<Theme | null>(null);

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved && this.themes.map((t) => t.name).includes(saved as ThemeNames)) {
      this.setTheme(
        this.themes.find((t) => t.name === (saved as ThemeNames)) as Theme,
      );
    } else {
      this.setTheme(this.themes[0]);
    }
  }

  setTheme(theme: Theme): void {
    document.body.setAttribute('data-theme', theme.name);
    localStorage.setItem('theme', theme.name);
    this.currentTheme.set(theme);
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  getCurrentTheme(): Theme | null {
    return this.currentTheme();
  }
}
