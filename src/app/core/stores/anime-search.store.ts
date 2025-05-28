import { inject, Injectable, signal } from '@angular/core';
import { AnimeService } from '@core/services/api/anime/anime.service';
import { Anime } from '@features/anime/models/anime.model';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
  of,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeSearchStore {
  animeService = inject(AnimeService);
  searchQuery = signal('');

  private searchQuerySubject = new Subject<string>();

  isLoading = signal(false);
  animeListSearchResult = signal<Anime[]>([]);
  error = signal<string | null>(null);

  constructor() {
    this.searchQuerySubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isLoading.set(true)),
        switchMap((query) => {
          if (query.length < 3) {
            this.animeListSearchResult.set([]);
            return of([]);
          }
          return this.animeService.liteSearch$(query).pipe(
            catchError((err) => {
              this.error.set(err.message);
              return of([]);
            }),
          );
        }),
        tap(() => this.isLoading.set(false)),
      )
      .subscribe((results) => {
        this.animeListSearchResult.set(results);
      });
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
    this.searchQuerySubject.next(query);
  }
}
