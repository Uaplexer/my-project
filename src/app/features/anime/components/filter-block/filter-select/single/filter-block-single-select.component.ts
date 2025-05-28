import { Component, input, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitledEntity } from '@shared/models/common.model';

@Component({
  selector: 'filter-block-single-select',
  imports: [FormsModule],
  templateUrl: './filter-block-single-select.component.html',
  styleUrl: './filter-block-single-select.component.scss',
})
export class FilterBlockSingleSelectComponent {
  filterTitle = input.required<string>();
  options = input.required<TitledEntity[]>();
  placeholder = input<string>('All');

  selectionChange = output<{ name: string; value: string }>();

  selectedValue = signal('');

  get filterTitleId(): string {
    return this.filterTitle().toLowerCase().replace(/\s+/g, '-') + '-select';
  }

  onSelectionChange(value: string) {
    this.selectionChange.emit({ name: this.filterTitle(), value: value });
  }
}
