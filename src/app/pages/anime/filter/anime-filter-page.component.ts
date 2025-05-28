import { Component, computed, inject, OnInit } from '@angular/core';
import { FilterBlockComponent } from '@features/anime/components/filter-block/filter-block.component';
import { AnimeGridComponent } from '@features/anime/components/grid/anime-grid.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AnimeListStore } from '@core/stores/anime.store';

@Component({
  selector: 'app-anime-filter-page',
  imports: [FilterBlockComponent, AnimeGridComponent, PaginationComponent],
  templateUrl: './anime-filter-page.component.html',
  styleUrl: './anime-filter-page.component.scss',
  providers: [AnimeListStore],
})
export class AnimeFilterPageComponent implements OnInit {
  readonly animeListStore = inject(AnimeListStore);

  readonly showPagination = computed(() => {
    return (
      !this.animeListStore.error() &&
      (this.animeListStore.data()?.totalPages || 0) > 1
    );
  });

  ngOnInit() {
    this.animeListStore.loadFiltered({ params: {} });
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
