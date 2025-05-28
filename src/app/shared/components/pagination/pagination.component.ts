import { Component, output, input, computed } from '@angular/core';
import { PaginationItemComponent } from './item/pagination-item.component';

@Component({
  selector: 'app-pagination',
  imports: [PaginationItemComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  currentPage = input(1);
  lastPage = input(2);

  maxPageOffset = input(3);

  paginationApplied = output<number>();

  visiblePages = computed(() => {
    const startPage = Math.max(this.currentPage() - this.maxPageOffset(), 1);
    const endPage = Math.min(
      this.currentPage() + this.maxPageOffset(),
      this.lastPage(),
    );
    return this.range(startPage, endPage - startPage + 1);
  });

  showFirstPageLink = computed(
    () => this.currentPage() > this.maxPageOffset() + 1,
  );

  showLastPageLink = computed(
    () => this.currentPage() < this.lastPage() - this.maxPageOffset(),
  );

  setPage(page: number) {
    if (this.currentPage() === page) return;
    this.paginationApplied.emit(page);
  }

  private range(start: number, count: number): number[] {
    return Array.from({ length: count }, (_, i) => start + i);
  }
}
