import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FilterBlockComponent } from '@features/anime/components/filter-block/filter-block.component';
import { AnimeGridComponent } from '@features/anime/components/grid/anime-grid.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AnimeListStore } from '@core/stores/anime.store';
import { firstValueFrom, forkJoin } from 'rxjs';
import { AnimeReferenceService } from '@core/services/api/anime/anime-reference.service';
import {
  AnimeFilterMultipleSelect,
  AnimeFilterSingleSelect,
} from '@features/anime/models/anime.model';
import { toCamelCase } from '@shared/utils/format.utils';

@Component({
  selector: 'app-anime-filter-page',
  imports: [FilterBlockComponent, AnimeGridComponent, PaginationComponent],
  templateUrl: './anime-filter-page.component.html',
  styleUrl: './anime-filter-page.component.scss',
  providers: [AnimeListStore],
})
export class AnimeFilterPageComponent implements OnInit {
  readonly animeListStore = inject(AnimeListStore);
  readonly animeReferenceService = inject(AnimeReferenceService);

  filterSingleSelects = signal<AnimeFilterSingleSelect[]>([]);
  filterMultipleSelects = signal<AnimeFilterMultipleSelect[]>([]);

  readonly showPagination = computed(() => {
    return (
      !this.animeListStore.error() &&
      (this.animeListStore.data()?.totalPages || 0) > 1
    );
  });

  async ngOnInit() {
    this.animeListStore.loadFiltered({ params: {} });
    const filters = await firstValueFrom(
      forkJoin([
        this.animeReferenceService.getAllTypes(),
        this.animeReferenceService.getAllStatuses(),
        this.animeReferenceService.getAllAgeRatings(),
        this.animeReferenceService.getAllGenres(),
        this.animeReferenceService.getAllThemes(),
      ]),
    );
    let [types, statuses, ageRatings, genres, themes] = filters;
    const addValueFromTitle = <T extends { title: string }>(
      arr: T[],
    ): (T & { value: string })[] =>
      arr.map((item) => ({
        ...item,
        value: toCamelCase(item.title),
      }));

    this.filterSingleSelects.set([
      { title: 'Types', options: addValueFromTitle(types) },
      { title: 'Statuses', options: addValueFromTitle(statuses) },
      { title: 'Age ratings', options: addValueFromTitle(ageRatings) },
      {
        title: 'Sort column',
        options: [
          { title: 'id', value: 'Id' },
          { title: 'score', value: 'Score' },
        ],
      },
      {
        title: 'Order direction',
        options: [
          { title: 'ASC', value: 'asc' },
          { title: 'DESC', value: 'desc' },
        ],
      },
    ]);
    this.filterMultipleSelects.set([
      {
        title: 'Genres',
        options: addValueFromTitle(genres),
      },
      { title: 'Themes', options: addValueFromTitle(themes) },
    ]);
  }

  onFiltersChanged(filters: Record<string, string | string[]>): void {
    this.animeListStore.loadFiltered({
      params: {
        ...filters,
        page: 1,
        pageSize: 24,
      },
    });
  }

  onPageChange(page: number): void {
    this.animeListStore.loadFiltered({
      params: { ...this.animeListStore.filters(), page: page, pageSize: 24 },
    });
  }
}
