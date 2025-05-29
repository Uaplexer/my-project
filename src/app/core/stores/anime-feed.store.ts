import { inject } from '@angular/core';
import { AnimeService } from '@core/services/api/anime/anime.service';
import { AnimeFeed } from '@features/anime/models/anime.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { GenericState } from '@shared/models/state.model';
import { debounceTime, delay, finalize, pipe, switchMap, tap } from 'rxjs';

interface AnimeFeedState extends GenericState<AnimeFeed> {}

const initialState: AnimeFeedState = {
  isLoading: false,
  data: null,
  error: null,
};

export const AnimeFeedStore = signalStore(
  withState(initialState),
  withMethods((store, animeService = inject(AnimeService)) => ({
    loadFeed: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        debounceTime(300),
        switchMap(() =>
          animeService.getFeed$().pipe(
            delay(500),
            tap({
              next: (feed) => patchState(store, { data: feed }),
              error: (error) => patchState(store, { error: error.message }),
            }),
            finalize(() => patchState(store, { isLoading: false })),
          ),
        ),
      ),
    ),
  })),
);
