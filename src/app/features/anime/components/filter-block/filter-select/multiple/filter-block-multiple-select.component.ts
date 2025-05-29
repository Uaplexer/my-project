import { Component, input, output, signal, computed } from '@angular/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { MatRippleModule } from '@angular/material/core';
import {
  AnimeFilterMultipleSelect,
  FilterChangeEvent,
} from '@features/anime/models/anime.model';

@Component({
  selector: 'filter-block-multiple-select',
  imports: [LucideAngularModule, MatRippleModule],
  templateUrl: './filter-block-multiple-select.component.html',
  styleUrl: './filter-block-multiple-select.component.scss',
})
export class FilterBlockMultipleSelectComponent {
  filterData = input.required<AnimeFilterMultipleSelect>();
  selectionChange = output<FilterChangeEvent>();

  isCollapsed = signal(true);
  selectedValues = signal<Set<string>>(new Set());

  readonly isExpanded = computed(() => !this.isCollapsed());
  readonly chevronIcon = computed(() =>
    this.isExpanded() ? ChevronUpIcon : ChevronDownIcon,
  );

  toggleCollapse(): void {
    this.isCollapsed.update((current) => !current);
  }

  toggleValue(value: string): void {
    this.selectedValues.update((current) => {
      const newSet = new Set(current);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return newSet;
    });

    this.selectionChange.emit({
      name: this.filterData().title,
      value: value,
    });
  }
}
