import { inject } from '@angular/core';
import { AnimeListService } from '@core/services/api/anime/anime-list.service';
import { AnimeListStatistics } from '@features/anime-list/models/anime-list.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { GenericState } from '@shared/models/state.model';
import { delay, finalize, pipe, switchMap, tap } from 'rxjs';

interface AnimeListStatisticsState extends GenericState<AnimeListStatistics> {}

const initialState: AnimeListStatisticsState = {
  isLoading: false,
  data: null,
  error: null,
};

export const AnimeListStatisticsStore = signalStore(
  withState(initialState),
  withMethods((store, animeListService = inject(AnimeListService)) => ({
    loadByUserId: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((userId) =>
          animeListService.getUserAllAnimeListStatistics$(userId).pipe(
            delay(500),
            tap({
              next: (statistics) =>
                patchState(store, {
                  data: statistics,
                }),
              error: (error) => patchState(store, { error: error.message }),
            }),
            finalize(() => patchState(store, { isLoading: false })),
          ),
        ),
      ),
    ),
  })),
);
