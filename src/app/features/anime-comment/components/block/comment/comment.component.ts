import { Component, input } from '@angular/core';
import { BaseComment } from '@features/anime-comment/models/anime-comment.model';
import { UserProfileSquareComponent } from '@features/user/components/profile-square/user-profile-square.component';

@Component({
  selector: 'app-comment',
  imports: [UserProfileSquareComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input.required<BaseComment>();
}
