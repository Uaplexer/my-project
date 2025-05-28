import { Component, input } from '@angular/core';
import { BaseComment } from '@features/anime-comment/models/anime-comment.model';
import { CommentComponent } from './comment/comment.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-comment-block',
  imports: [CommentComponent, MatProgressBarModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class CommentBlockComponent {
  comments = input<BaseComment[] | null>();
  isLoading = input<boolean>(false);
}
