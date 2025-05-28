import { Component, input } from '@angular/core';

@Component({
  selector: 'pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrl: './pagination-item.component.scss',
  host: {
    '[class.active]': 'isActive()',
    '[class.inactive]': '!isActive()',
  },
})
export class PaginationItemComponent {
  value = input.required<string | number>();
  isActive = input<boolean>(false);
}
