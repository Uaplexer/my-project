import { Component, inject, OnInit, output } from '@angular/core';
import { AnimeReferenceService } from '@core/services/api/anime/anime-reference.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { FilterBlockSingleSelectComponent } from './filter-select/single/filter-block-single-select.component';
import { FilterBlockMultipleSelectComponent } from './filter-select/multiple/filter-block-multiple-select.component';
import { TitledEntity } from '@shared/models/common.model';

interface FilterChangeEvent {
  name: string;
  value: string;
}

@Component({
  selector: 'app-filter-block',
  imports: [
    FilterBlockSingleSelectComponent,
    FilterBlockMultipleSelectComponent,
  ],
  templateUrl: './filter-block.component.html',
  styleUrl: './filter-block.component.scss',
})
export class FilterBlockComponent implements OnInit {
  readonly animeReferenceService = inject(AnimeReferenceService);
  readonly filtersApplied = output<Record<string, string | string[]>>();

  filters: Record<string, string | string[]> = {};

  availableTypes: TitledEntity[] = [];
  availableStatuses: TitledEntity[] = [];
  availableAgeRatings: TitledEntity[] = [];

  availableGenres: TitledEntity[] = [];
  availableThemes: TitledEntity[] = [];

  availableSortOptions = [{ title: 'Id' }, { title: 'Score' }];
  availableSortOrders = [{ title: 'ASC' }, { title: 'DESC' }];

  async ngOnInit(): Promise<void> {
    const result = await firstValueFrom(
      forkJoin([
        this.animeReferenceService.getAllTypes(),
        this.animeReferenceService.getAllStatuses(),
        this.animeReferenceService.getAllAgeRatings(),
        this.animeReferenceService.getAllGenres(),
        this.animeReferenceService.getAllThemes(),
      ]),
    );

    if (result) {
      const [types, statuses, ageRatings, genres, themes] = result;
      this.availableTypes = types;
      this.availableStatuses = statuses;
      this.availableAgeRatings = ageRatings;
      this.availableGenres = genres;
      this.availableThemes = themes;
    }
  }

  emitFilters() {
    this.filtersApplied.emit({ ...this.filters });
  }

  onSingleSelectChange({ name, value }: FilterChangeEvent) {
    if (value === '') {
      delete this.filters[name];
    } else {
      this.filters[name] = value;
    }
    this.emitFilters();
  }

  onMultipleSelectChange({ name, value }: FilterChangeEvent) {
    const current = this.filters[name];
    const arr = Array.isArray(current)
      ? [...current]
      : current
        ? [current]
        : [];

    if (arr.includes(value)) {
      this.filters[name] = arr.filter((v) => v !== value);
    } else {
      this.filters[name] = [...arr, value];
    }
    this.emitFilters();
  }
}
