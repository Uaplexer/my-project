import { Component, input } from '@angular/core';
import { Anime } from '@features/anime/models/anime.model';
import { AnimeGridItemComponent } from './item/anime-grid-item.component';
import { PaginationResponse } from '@shared/models/pagination.model';

@Component({
  selector: 'anime-grid',
  imports: [AnimeGridItemComponent],
  templateUrl: './anime-grid.component.html',
  styleUrl: './anime-grid.component.scss',
})
export class AnimeGridComponent {
  animeListResponse = input.required<PaginationResponse<Anime> | null>();
  isLoading = input.required<boolean>();
  error = input<string>();

  readonly skeletonItems = Array(24).fill(null);
}
