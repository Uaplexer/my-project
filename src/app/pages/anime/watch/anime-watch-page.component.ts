import { Component, inject, OnInit, OnDestroy, input } from '@angular/core';
import { AnimePlayerStore } from '@core/stores/anime-player.store';
import { VideoPlayerComponent } from '@features/anime/components/video-player/video-player.component';
import { AnimeEpisodeListComponent } from '@features/anime-episodes/components/list/anime-episode-list.component';
import { AnimeInfoPanelComponent } from '@features/anime/components/info-panel/anime-info-panel.component';
import { Anime } from '@features/anime/models/anime.model';

@Component({
  selector: 'anime-watch-page',
  imports: [
    VideoPlayerComponent,
    AnimeEpisodeListComponent,
    AnimeInfoPanelComponent,
  ],
  templateUrl: './anime-watch-page.component.html',
  styleUrl: './anime-watch-page.component.scss',
})
export class AnimeWatchPageComponent implements OnInit, OnDestroy {
  store = inject(AnimePlayerStore);
  anime = input.required<Anime>();

  async ngOnInit() {
    const anime = this.anime();
    this.store.setAnime(anime);
    this.store.loadEpisodesByTitle(anime.title);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.store.resetState();
  }
}
