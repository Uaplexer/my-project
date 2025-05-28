import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DotIcon, LucideAngularModule, StarIcon } from 'lucide-angular';
import { Anime } from '@features/anime/models/anime.model';
import { DecimalPipe } from '@angular/common';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';
import { AnimeGenreListComponent } from '../../../genre-list/genre-list.component';

@Component({
  selector: 'search-bar-anime-list-card',
  imports: [
    RouterModule,
    LucideAngularModule,
    DecimalPipe,
    FallbackImageDirective,
    AnimeGenreListComponent,
  ],
  templateUrl: './search-bar-anime-list-card.component.html',
  styleUrl: './search-bar-anime-list-card.component.scss',
})
export class SearchBarAnimeListCardComponent {
  anime = input.required<Anime>();

  readonly StarIcon = StarIcon;
  readonly DotIcon = DotIcon;
}
