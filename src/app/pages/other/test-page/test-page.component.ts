import { Component } from '@angular/core';
import { CommentComponent } from '@features/anime-comment/components/block/comment/comment.component';

@Component({
  selector: 'app-test-page',
  imports: [CommentComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent {
  testComment = {
    id: 1,
    content:
      'Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world ',
    entityId: 3,
    createdAt: new Date(10),
    user: {
      id: 1,
      username: 'Ruplexer444444',
      about: 'hi',
      avatars: 'null',
      createdAt: new Date(10),
    },
  };
}
