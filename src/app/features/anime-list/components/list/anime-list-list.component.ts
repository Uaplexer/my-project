import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  CircleCheckIcon,
  CirclePauseIcon,
  CircleXIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  LucideAngularModule,
  StarIcon,
} from 'lucide-angular';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationResponse } from '@shared/models/pagination.model';
import { RouterModule } from '@angular/router';
import { LucideIconData } from 'node_modules/lucide-angular/icons/types';
import {
  AnimeList,
  AnimeListType,
} from '@features/anime-list/models/anime-list.model';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';

@Component({
  selector: 'anime-list-list',
  imports: [
    CommonModule,
    LucideAngularModule,
    MatPaginatorModule,
    RouterModule,
    FallbackImageDirective,
  ],
  templateUrl: './anime-list-list.component.html',
  styleUrl: './anime-list-list.component.scss',
})
export class AnimeListListComponent {
  animeListType = input<AnimeListType | null>();
  isLoading = input.required<boolean>();
  animeListListResponse = input<PaginationResponse<AnimeList> | null>();
  error = input<string | null>();

  typeChanged = output<AnimeListType>();
  pageChanged = output<number>();

  onTypeChange(tab: string) {
    this.typeChanged.emit(tab as AnimeListType);
  }

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event.pageIndex + 1);
  }

  getStatusIcon(status: string): LucideIconData | undefined {
    switch (status) {
      case 'Viewed':
        return CircleCheckIcon;
      case 'Watching':
        return ClockIcon;
      case 'Abandoned':
        return CircleXIcon;
      case 'Postponed':
        return CirclePauseIcon;
      default:
        return undefined;
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'Viewed':
        return 'Completed';
      case 'Watching':
        return 'Watching';
      case 'Abandoned':
        return 'Dropped';
      case 'Postponed':
        return 'On Hold';
      default:
        return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Viewed':
        return 'anime-list-status-icon--completed';
      case 'Watching':
        return 'anime-list-status-icon--watching';
      case 'Abandoned':
        return 'anime-list-status-icon--dropped';
      case 'Postponed':
        return 'anime-list-status-icon--on-hold';
      default:
        return '';
    }
  }

  readonly StarIcon = StarIcon;
  readonly CircleCheckIcon = CircleCheckIcon;
  readonly CirclePauseIcon = CirclePauseIcon;
  readonly CircleXIcon = CircleXIcon;
  readonly ClockIcon = ClockIcon;
  readonly EllipsisVerticalIcon = EllipsisVerticalIcon;
}
