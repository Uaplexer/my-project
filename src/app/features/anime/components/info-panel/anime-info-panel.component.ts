import { Component, input } from '@angular/core';
import { Anime } from '@features/anime/models/anime.model';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';

@Component({
  selector: 'anime-info-panel',
  imports: [FallbackImageDirective],
  templateUrl: './anime-info-panel.component.html',
  styleUrl: './anime-info-panel.component.scss',
})
export class AnimeInfoPanelComponent {
  anime = input.required<Anime>();
}
