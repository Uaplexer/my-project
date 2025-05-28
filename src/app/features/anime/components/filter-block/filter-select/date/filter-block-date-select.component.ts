import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'filter-block-date-select',
  templateUrl: './filter-block-date-select.component.html',
  styleUrl: './filter-block-date-select.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBlockDateSelect {
  placeholder = input.required<string>();
}
