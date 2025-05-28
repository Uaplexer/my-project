import { Component, input, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimeFilterSingleSelect } from '@features/anime/models/anime.model';

@Component({
  selector: 'filter-block-single-select',
  imports: [FormsModule],
  templateUrl: './filter-block-single-select.component.html',
  styleUrl: './filter-block-single-select.component.scss',
})
export class FilterBlockSingleSelectComponent {
  filterData = input.required<AnimeFilterSingleSelect>();
  placeholder = input<string>('All');

  selectionChange = output<{ name: string; value: string }>();

  selectedValue = signal('');

  onSelectionChange(value: string) {
    this.selectionChange.emit({ name: this.filterData().title, value: value });
  }
}
