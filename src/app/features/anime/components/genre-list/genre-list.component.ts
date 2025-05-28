import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'anime-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss',
})
export class AnimeGenreListComponent {
  genres = input<string[]>([]);
  maxSize = input<number>(3);

  genresLength = computed(() => this.genres().length);

  visibleGenres = computed(() => this.genres().slice(0, this.maxSize()));

  isToggled = signal(false);

  toggleGenres() {
    this.isToggled.update((prev) => !prev);
  }
}
