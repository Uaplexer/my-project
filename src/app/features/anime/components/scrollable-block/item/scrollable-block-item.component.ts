import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Anime } from '@features/anime/models/anime.model';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';
import { LucideAngularModule, StarIcon } from 'lucide-angular';
import { AnimeGenreListComponent } from '../../genre-list/genre-list.component';

@Component({
  selector: 'anime-scrollable-block-item',
  imports: [
    RouterModule,
    LucideAngularModule,
    FallbackImageDirective,
    AnimeGenreListComponent,
  ],
  templateUrl: './scrollable-block-item.component.html',
  styleUrl: './scrollable-block-item.component.scss',
})
export class AnimeScrollableBlockItemComponent {
  anime = input.required<Anime>();

  readonly starIcon = StarIcon;
}
