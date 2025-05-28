import { Component, inject, OnInit } from '@angular/core';
import { AnimeCarouselComponent } from '@features/anime/components/carousel/anime-carousel.component';
import { AnimeFeedStore } from '@core/stores/anime-feed.store';
import { AnimeScrollableBlockComponent } from '@features/anime/components/scrollable-block/anime-scrollable-block.component';

@Component({
  selector: 'app-anime-home-page',
  imports: [AnimeCarouselComponent, AnimeScrollableBlockComponent],
  templateUrl: './anime-home-page.component.html',
  styleUrl: './anime-home-page.component.scss',
  providers: [AnimeFeedStore],
})
export class AnimeHomePageComponent {
  animeFeedStore = inject(AnimeFeedStore);
  constructor() {
    this.animeFeedStore.loadFeed();
  }
}
