import { inject } from '@angular/core';
import { AnimeListService } from '@core/services/api/anime/anime-list.service';
import {
  AnimeList,
  AnimeListType,
} from '@features/anime-list/models/anime-list.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  BasePagination,
  PaginationResponse,
} from '@shared/models/pagination.model';
import { GenericState } from '@shared/models/state.model';
import { debounceTime, delay, finalize, pipe, switchMap, tap } from 'rxjs';

interface AnimeListListState
  extends GenericState<PaginationResponse<AnimeList>> {
  type: AnimeListType | null;
}

const initialState: AnimeListListState = {
  isLoading: false,
  data: null,
  type: null,
  error: null,
};

export const AnimeListListStore = signalStore(
  withState(initialState),
  withMethods((store, animeListService = inject(AnimeListService)) => ({
    loadByType: rxMethod<{
      userId: number;
      type: AnimeListType | null;
      pagination: BasePagination;
    }>(
      pipe(
        tap((params) =>
          patchState(store, {
            isLoading: true,
            type: params.type,
            error: null,
          }),
        ),
        debounceTime(300),
        switchMap((params) =>
          animeListService
            .getUserAnimeListByType$(
              params.userId,
              params.type,
              params.pagination,
            )
            .pipe(
              delay(500),
              tap({
                next: (response) =>
                  patchState(store, {
                    data: response,
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
  })),
);
