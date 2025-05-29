import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { inject, computed } from '@angular/core';
import Hls from 'hls.js';
import { Episode } from '@features/anime-episodes/models/episode.model';
import { Anime } from '@features/anime/models/anime.model';
import { AnimeEpisodeService } from '@core/services/api/anime/anime-episode.service';
import { withDevtools, withReset } from '@angular-architects/ngrx-toolkit';

type VideoPlayerSettings = 'autoNext' | 'autoSkipIntro';

interface AnimePlayerState {
  anime: Anime | null;
  episodes: Episode[];
  query: string;
  currentEpisode: Episode | null;

  // Video Player State
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  isOpeningSkipped: boolean;
  showVolumeControl: boolean;
  volume: number;
  currentTime: string;
  duration: string;
  progress: number;
  bufferedProgress: number;

  // Settings
  autoNext: boolean;
  autoSkipIntro: boolean;

  // Status
  isLoading: boolean;
  error: string | null;
}

const initialState: AnimePlayerState = {
  anime: null,
  episodes: [],
  query: '',
  currentEpisode: null,

  // player state
  isPlaying: false,
  isMuted: false,
  isFullscreen: false,
  isOpeningSkipped: false,
  showVolumeControl: false,
  volume: 1,
  currentTime: '00:00',
  duration: '00:00',
  progress: 0,
  bufferedProgress: 0,

  // settings
  autoNext: true,
  autoSkipIntro: true,

  // status
  isLoading: false,
  error: null,
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const AnimePlayerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withReset(),
  withDevtools('playerStore'),
  withComputed(({ episodes, query, currentEpisode }) => ({
    filteredEpisodes: computed(() => {
      const q = query().trim().toLowerCase();
      if (!q) return episodes();

      return episodes().filter(
        (episode) =>
          episode.name?.toLowerCase().includes(q) ||
          episode.episode.toString().includes(q),
      );
    }),

    hasCurrentEpisode: computed(() => !!currentEpisode()),
  })),
  withMethods((store, animeEpisodeService = inject(AnimeEpisodeService)) => {
    let hls: Hls | null = null;
    let timeUpdateInterval: ReturnType<typeof setInterval> | undefined;

    const startTimeUpdate = (videoElement: HTMLVideoElement) => {
      timeUpdateInterval = setInterval(() => {
        const currentTime = formatTime(videoElement.currentTime);
        const progress =
          (videoElement.currentTime / videoElement.duration) * 100 || 0;
        let bufferedEnd = 0;
        if (videoElement.buffered.length > 0) {
          bufferedEnd = videoElement.buffered.end(
            videoElement.buffered.length - 1,
          );
        }

        const bufferedProgress =
          (bufferedEnd / videoElement.duration) * 100 || 0;

        patchState(store, {
          currentTime,
          progress,
          bufferedProgress,
        });

        if (!store.isOpeningSkipped() && store.autoSkipIntro()) {
          const skips = store.currentEpisode()?.skips?.opening;
          if (skips?.length === 2) {
            const [start, end] = skips;
            if (
              videoElement.currentTime >= start &&
              videoElement.currentTime <= end
            ) {
              videoElement.currentTime = end;
              patchState(store, { isOpeningSkipped: true });
            }
          }
        }
      }, 1000);
    };

    const stopTimeUpdate = () => {
      if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
      }
    };

    return {
      loadEpisodesByTitle: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((title) =>
            animeEpisodeService.getByTitle$(title).pipe(
              tap({
                next: (episodes) =>
                  patchState(store, {
                    episodes,
                    currentEpisode: episodes[0] ?? null,
                  }),
                error: (error) =>
                  patchState(store, {
                    error: error.message,
                  }),
              }),
              finalize(() => patchState(store, { isLoading: false })),
            ),
          ),
        ),
      ),

      playEpisode(episode: Episode, videoElement?: HTMLVideoElement) {
        if (!episode.hls?.hd) {
          patchState(store, { error: 'No HLS source available' });
          return;
        }
        if (!videoElement) {
          videoElement = document.querySelector('video')!;
        }

        if (hls) {
          hls.destroy();
          stopTimeUpdate();
        }

        hls = new Hls();
        hls.loadSource(episode.hls.hd);
        hls.attachMedia(videoElement);

        patchState(store, {
          currentEpisode: episode,
        });

        videoElement
          .play()
          .then(() => {
            patchState(store, {
              isPlaying: true,
              isOpeningSkipped: false,
              error: null,
              duration: formatTime(videoElement.duration),
            });
            startTimeUpdate(videoElement);
          })
          .catch((error) => {
            patchState(store, {
              error: error.message,
              isPlaying: false,
            });
          });
      },

      togglePlay(videoElement: HTMLVideoElement) {
        if (store.isPlaying()) {
          videoElement.pause();
          stopTimeUpdate();
          patchState(store, { isPlaying: false });
        } else {
          videoElement
            .play()
            .then(() => {
              patchState(store, { isPlaying: true });
              startTimeUpdate(videoElement);
            })
            .catch((error) => {
              patchState(store, {
                error: error.message,
                isPlaying: false,
              });
            });
        }
      },

      toggleMute(videoElement: HTMLVideoElement) {
        videoElement.muted = !videoElement.muted;
        patchState(store, {
          isMuted: videoElement.muted,
          volume: videoElement.muted ? 0 : store.volume(),
        });
      },

      setVolume(
        event: Event,
        videoElement: HTMLVideoElement,
        volumeSlider: HTMLInputElement,
      ) {
        const value = (event.target as HTMLInputElement).value;
        const volume = Number.parseFloat(value);
        videoElement.volume = volume;
        volumeSlider.value = String(volume);
        patchState(store, {
          volume,
          isMuted: volume === 0,
        });
      },

      seekVideo(
        event: MouseEvent,
        videoElement: HTMLVideoElement,
        progressBar: HTMLDivElement,
      ) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (event.clientX - rect.left) / rect.width;
        videoElement.currentTime = pos * videoElement.duration;
      },

      toggleFullscreen(videoContainer: HTMLElement) {
        if (!store.isFullscreen()) {
          videoContainer.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
        patchState(store, { isFullscreen: !store.isFullscreen() });
      },

      toggleSetting(setting: VideoPlayerSettings) {
        patchState(store, { [setting]: !store[setting]() });
      },

      setAnime(anime: Anime) {
        patchState(store, { anime });
      },

      cleanup() {
        if (hls) {
          hls.destroy();
          hls = null;
        }
        stopTimeUpdate();
      },

      setEpisodeQuery(query: string) {
        patchState(store, { query });
      },
    };
  }),
);
