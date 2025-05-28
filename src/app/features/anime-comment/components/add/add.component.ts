import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { SessionService } from '@core/services/api/auth/session.service';
import { AnimeCommentStore } from '@core/stores/anime-comment.store';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddCommentComponent {
  store = inject(AnimeCommentStore);
  sessionService = inject(SessionService);

  textAreaRef = viewChild.required<ElementRef<HTMLTextAreaElement>>('comment');

  addComment(animeId: number | null) {
    const text = this.textAreaRef().nativeElement.value;
    if (!animeId || !text) {
      return;
    }
    if (this.sessionService.status().isAuthenticated) {
      const user = this.sessionService.user();
      this.store.addComment(animeId, text.trim(), user!);
      this.textAreaRef().nativeElement.value = '';
    }
  }
}
