import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { firstValueFrom, Observable } from 'rxjs';
import {
  BasePagination,
  PaginationResponse,
} from '@shared/models/pagination.model';
import {
  AnimeList,
  AnimeListStatistics,
  AnimeListType,
  BaseAnimeList,
} from '@features/anime-list/models/anime-list.model';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AnimeListService {
  private http = inject(HttpClient);

  addAnimeToList(
    animeId: number,
    animeListType: string,
  ): Observable<BaseAnimeList> {
    return this.http.post<BaseAnimeList>(
      `${environment.baseApiUrl}/anime/${animeId}/list`,
      {
        animeListType,
      },
    );
  }

  getUserAllAnimeListStatistics$(
    userId: number,
  ): Observable<AnimeListStatistics> {
    return this.http.get<AnimeListStatistics>(
      `${environment.baseApiUrl}/user/${userId}/anime-lists/statistics`,
    );
  }

  async getUserAllAnimeListStatistics(
    userId: number,
  ): Promise<AnimeListStatistics> {
    return firstValueFrom(this.getUserAllAnimeListStatistics$(userId));
  }

  getUserAnimeList$(
    userId: number,
    pagination: BasePagination,
  ): Observable<PaginationResponse<AnimeList>> {
    return this.http.get<PaginationResponse<AnimeList>>(
      `${environment.baseApiUrl}/user/${userId}/anime-lists`,
      { params: { ...pagination } },
    );
  }

  async getUserAnimeList(
    userId: number,
    pagination: BasePagination,
  ): Promise<PaginationResponse<AnimeList>> {
    return firstValueFrom(this.getUserAnimeList$(userId, pagination));
  }

  getUserAnimeListByType$(
    userId: number,
    type: AnimeListType | null,
    pagination: BasePagination,
  ): Observable<PaginationResponse<AnimeList>> {
    return this.http.get<PaginationResponse<AnimeList>>(
      `${environment.baseApiUrl}/user/${userId}/anime-lists/${type}`,
      { params: { ...pagination } },
    );
  }

  async getUserAnimeListByType(
    userId: number,
    type: string,
    pagination: BasePagination,
  ): Promise<PaginationResponse<AnimeList>> {
    return firstValueFrom(
      this.http.get<PaginationResponse<AnimeList>>(
        `${environment.baseApiUrl}/user/${userId}/anime-lists/${type}`,
        { params: { ...pagination } },
      ),
    );
  }

  getAllAnimeListStatistics(): Observable<AnimeListStatistics> {
    return this.http.get<AnimeListStatistics>(`/anime/list/statistics`);
  }

  getAnimeListStatistics(animeId: number): Observable<AnimeListStatistics> {
    return this.http.get<AnimeListStatistics>(
      `/anime/${animeId}/list/statistics`,
    );
  }
}
