import {
  Component,
  input,
  viewChild,
  DestroyRef,
  inject,
  ElementRef,
} from '@angular/core';
import { AnimePlayerStore } from '@core/stores/anime-player.store';
import { Episode } from '@features/anime-episodes/models/episode.model';
import { Anime } from '@features/anime/models/anime.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  store = inject(AnimePlayerStore);

  anime = input.required<Anime>();
  currentEpisode = input<Episode | null>();

  videoPlayer = viewChild.required<ElementRef<HTMLVideoElement>>('videoPlayer');
  progressBar = viewChild.required<ElementRef<HTMLDivElement>>('progressBar');
  volumeSlider =
    viewChild.required<ElementRef<HTMLInputElement>>('volumeSlider');

  togglePlay() {
    this.store.togglePlay(this.videoPlayer().nativeElement);
  }

  toggleMute() {
    this.store.toggleMute(this.videoPlayer().nativeElement);
  }

  setVolume(event: Event) {
    this.store.setVolume(
      event,
      this.videoPlayer().nativeElement,
      this.volumeSlider().nativeElement,
    );
  }

  seekVideo(event: MouseEvent) {
    this.store.seekVideo(
      event,
      this.videoPlayer().nativeElement,
      this.progressBar().nativeElement,
    );
  }

  toggleFullscreen() {
    this.store.toggleFullscreen(
      this.videoPlayer().nativeElement.parentElement!,
    );
  }

  toggleSetting(setting: 'autoNext' | 'autoSkipIntro') {
    this.store.toggleSetting(setting);
  }

  ngOnDestroy() {
    this.store.cleanup();
    this.store.resetState();
  }
}
