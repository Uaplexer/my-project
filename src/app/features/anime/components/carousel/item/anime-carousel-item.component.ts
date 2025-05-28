import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseAnime } from '@features/anime/models/anime.model';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';
import { LucideAngularModule, StarIcon } from 'lucide-angular';

@Component({
  selector: 'anime-carousel-item',
  imports: [LucideAngularModule, FallbackImageDirective, RouterModule],
  templateUrl: './anime-carousel-item.component.html',
  styleUrl: './anime-carousel-item.component.scss',
})
export class AnimeCarouselItemComponent {
  anime = input.required<BaseAnime>();
  StarIcon = StarIcon;
}
