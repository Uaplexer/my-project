import { computed, inject, Injectable, signal } from '@angular/core';
import { AnimeCommentService } from '@core/services/api/anime/anime-comment.service';
import { SessionService } from '@core/services/api/auth/session.service';
import { BaseComment } from '@features/anime-comment/models/anime-comment.model';
import { User } from '@features/user/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AnimeCommentStore {
  animeCommentService = inject(AnimeCommentService);
  sessionService = inject(SessionService);

  currentAnimeId = signal<number | null>(null);
  comments = signal<BaseComment[] | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  loaded = computed(() => !!this.comments());

  loadComments(animeId: number) {
    this.isLoading.set(true);
    this.animeCommentService
      .getByAnimeId$(animeId, { page: 1, pageSize: 24 })
      .subscribe({
        next: (response) => {
          this.comments.set(response.items);
          this.currentAnimeId.set(animeId);
        },
        error: (error) => this.error.set(error.message),
        complete: () => this.isLoading.set(false),
      });
  }

  addComment(animeId: number, text: string, user: User) {
    this.animeCommentService.addComment$(animeId, text).subscribe({
      next: (comment: BaseComment) => {
        comment.user = user;
        this.comments.update((prev) => [...prev!, comment]);
      },
    });
  }
}
