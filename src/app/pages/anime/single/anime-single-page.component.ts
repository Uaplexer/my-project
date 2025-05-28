import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anime } from '@features/anime/models/anime.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {
  ChevronLeftIcon,
  HeartIcon,
  LucideAngularModule,
  PlayIcon,
  StarIcon,
  DotIcon,
  CalendarIcon,
} from 'lucide-angular';
import { Subject } from 'rxjs';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';
import { AnimeListDropdownMenuComponent } from '@features/anime-list/components/dropdown-menu/anime-list-dropdown-menu.component';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { AnimeCommentStore } from '@core/stores/anime-comment.store';
import { CommentBlockComponent } from '@features/anime-comment/components/block/block.component';
import { AddCommentComponent } from '@features/anime-comment/components/add/add.component';
import { AnimeGenreListComponent } from '../../../features/anime/components/genre-list/genre-list.component';

@Component({
  selector: 'anime-single-page',
  imports: [
    DatePipe,
    FormsModule,
    LucideAngularModule,
    CommonModule,
    RouterModule,
    FallbackImageDirective,
    AnimeListDropdownMenuComponent,
    TabsComponent,
    CommentBlockComponent,
    AddCommentComponent,
    AnimeGenreListComponent,
  ],
  templateUrl: './anime-single-page.component.html',
  styleUrl: './anime-single-page.component.scss',
})
export class AnimeSinglePageComponent implements OnInit, OnDestroy {
  store = inject(AnimeCommentStore);
  anime = input.required<Anime>();

  currentTab = signal<string>('Synopsis');

  private destroy$ = new Subject<void>();

  onTabChange(tab: string) {
    if (
      (tab == 'Comments' && !this.store.loaded()) ||
      this.anime().id != this.store.currentAnimeId()
    ) {
      this.store.loadComments(this.anime().id);
    }
    this.currentTab.set(tab);
  }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly StarIcon = StarIcon;
  readonly PlayIcon = PlayIcon;
  readonly HeartIcon = HeartIcon;
  readonly DotIcon = DotIcon;
  readonly CalendarIcon = CalendarIcon;
}
