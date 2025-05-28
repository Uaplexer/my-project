import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseAnime } from '@features/anime/models/anime.model';
import { BlockHeaderComponent } from '@shared/components/block-header/block-header.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AnimeCarouselItemComponent } from './item/anime-carousel-item.component';

@Component({
  selector: 'anime-carousel',
  imports: [
    SlickCarouselModule,
    RouterModule,
    BlockHeaderComponent,
    AnimeCarouselItemComponent,
  ],
  templateUrl: './anime-carousel.component.html',
  styleUrl: './anime-carousel.component.scss',
})
export class AnimeCarouselComponent {
  title = input.required<string>();
  animeList = input<BaseAnime[]>();
  isLoading = input<boolean>();
  skeletonItems = Array(11).fill(0);

  slideConfig = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [],
  };
}
