import { inject } from '@angular/core';
import { AnimeService } from '@core/services/api/anime/anime.service';
import { Anime, AnimeFilterStruct } from '@features/anime/models/anime.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PaginationResponse } from '@shared/models/pagination.model';
import { GenericState } from '@shared/models/state.model';
import { debounceTime, delay, pipe, switchMap, tap } from 'rxjs';

interface AnimeListState extends GenericState<PaginationResponse<Anime>> {
  filters: AnimeFilterStruct | null;
}

const initialState: AnimeListState = {
  isLoading: false,
  data: null,
  filters: null,
  error: null,
};

export const AnimeListStore = signalStore(
  withState(initialState),
  withMethods((store, animeService = inject(AnimeService)) => ({
    loadFiltered: rxMethod<{ params: any | null }>(
      pipe(
        tap(() =>
          patchState(store, { isLoading: true, error: null, filters: null }),
        ),
        debounceTime(300),
        switchMap(({ params }) =>
          animeService.filter$(params).pipe(
            delay(500),
            tap({
              next: (response) =>
                patchState(store, {
                  isLoading: false,
                  data: response,
                  filters: params,
                }),
              error: (error) =>
                patchState(store, { isLoading: false, error: error.message }),
            }),
          ),
        ),
      ),
    ),
  })),
);
