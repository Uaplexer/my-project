import { Component } from '@angular/core';
import { AnimeGenreListComponent } from '@features/anime/components/genre-list/genre-list.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [AnimeGenreListComponent],
})
export class FooterComponent {}
