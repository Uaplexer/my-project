import { Component, input, output, signal } from '@angular/core';
import { FilterBlockSingleSelectComponent } from './filter-select/single/filter-block-single-select.component';
import { FilterBlockMultipleSelectComponent } from './filter-select/multiple/filter-block-multiple-select.component';
import {
  AnimeFilterMultipleSelect,
  AnimeFilterSingleSelect,
} from '@features/anime/models/anime.model';

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
export class FilterBlockComponent {
  singleSelects = input<AnimeFilterSingleSelect[]>();
  multipleSelects = input<AnimeFilterMultipleSelect[]>();

  filtersApplied = output<Record<string, string | string[]>>();

  filters = signal<Record<string, string | string[]>>({});

  emitFilters() {
    this.filtersApplied.emit(this.filters());
  }

  onSingleSelectChange({ name, value }: FilterChangeEvent) {
    this.filters.update((current) => {
      const updated = { ...current };
      if (value === '') {
        delete updated[name];
      } else {
        updated[name] = value;
      }
      return updated;
    });
    this.emitFilters();
  }

  onMultipleSelectChange({ name, value }: FilterChangeEvent) {
    this.filters.update((current) => {
      const updated = { ...current };
      const existing = updated[name];
      const values = Array.isArray(existing)
        ? [...existing]
        : existing
          ? [existing]
          : [];

      if (values.includes(value)) {
        updated[name] = values.filter((v) => v !== value);
      } else {
        updated[name] = [...values, value];
      }

      return updated;
    });
    this.emitFilters();
  }
}
