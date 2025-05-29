import { Injectable, signal } from '@angular/core';
import { Theme, ThemeNames } from '@shared/models/theme.model';
import {
  LOCAL_STORAGE_THEME_KEY,
  HTML_DATA_THEME_ATTRIBUTE,
} from '@shared/constants/theme.constants';

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
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (
      savedTheme &&
      this.themes.map((t) => t.name).includes(savedTheme as ThemeNames)
    ) {
      this.setTheme(
        this.themes.find((t) => t.name === (savedTheme as ThemeNames)) as Theme,
      );
    } else {
      this.setTheme(this.themes[0]);
    }
  }

  setTheme(theme: Theme): void {
    document.body.setAttribute(HTML_DATA_THEME_ATTRIBUTE, theme.name);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme.name);
    this.currentTheme.set(theme);
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  getCurrentTheme(): Theme | null {
    return this.currentTheme();
  }
}
