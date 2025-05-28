import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { AnimeListService } from '@core/services/api/anime/anime-list.service';
import { SessionService } from '@core/services/api/auth/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CircleCheckBigIcon,
  CirclePauseIcon,
  CircleXIcon,
  ClockIcon,
  HeartIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthFlowService } from '@core/services/api/auth/auth-flow.service';

@Component({
  selector: 'anime-list-dropdown-menu',
  imports: [LucideAngularModule],
  templateUrl: './anime-list-dropdown-menu.component.html',
  styleUrl: './anime-list-dropdown-menu.component.scss',
})
export class AnimeListDropdownMenuComponent implements OnDestroy {
  animeId = input.required<number>();

  public isMenuVisible = signal(false);

  private animeListService = inject(AnimeListService);
  private sessionService = inject(SessionService);
  private authFlowService = inject(AuthFlowService);
  private snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();

  closeMenu() {
    this.isMenuVisible.set(false);
  }

  toggleMenu() {
    if (this.sessionService.status().isAuthenticated) {
      this.isMenuVisible.update((prev) => !prev);
    } else {
      console.log('User is not authenticated. Redirecting to login...');
      this.authFlowService.openAuthModal();
    }
  }

  addToList(status: string) {
    this.animeListService
      .addAnimeToList(this.animeId(), status)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.closeMenu();
          this.snackBar.open(
            `Anime added to ${status.toLowerCase()} list`,
            undefined,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            },
          );
        },
        error: (error) => {
          console.error('Error adding anime to list:', error);
        },
      });
    this.closeMenu();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly HeartIcon = HeartIcon;
  readonly CircleCheckBigIcon = CircleCheckBigIcon;
  readonly CirclePauseIcon = CirclePauseIcon;
  readonly CircleXIcon = CircleXIcon;
  readonly ClockIcon = ClockIcon;
}
