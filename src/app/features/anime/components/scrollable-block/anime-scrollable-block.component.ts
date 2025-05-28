import { Component, input } from '@angular/core';
import { AnimeScrollableBlockItemComponent } from './item/scrollable-block-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BlockHeaderComponent } from '@shared/components/block-header/block-header.component';

@Component({
  selector: 'anime-scrollable-block',
  imports: [
    AnimeScrollableBlockItemComponent,
    BlockHeaderComponent,
    ScrollingModule,
  ],
  templateUrl: './anime-scrollable-block.component.html',
  styleUrl: './anime-scrollable-block.component.scss',
})
export class AnimeScrollableBlockComponent {
  title = input<string>();
  animeList = input.required<any>();
  isLoading = input<boolean>();
}
