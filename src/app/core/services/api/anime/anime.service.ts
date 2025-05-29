import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import {
  BasePagination,
  PaginationResponse,
} from '@shared/models/pagination.model';
import {
  BaseAnime,
  Anime,
  AnimeFeed,
  AnimeFilterStruct,
} from '@features/anime/models/anime.model';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private apiUrl = `${environment.baseApiUrl}/anime`;

  readonly http = inject(HttpClient);

  async getAll(pagination: BasePagination): Promise<PaginationResponse<Anime>> {
    return firstValueFrom(
      this.http.get<PaginationResponse<Anime>>(this.apiUrl, {
        params: { ...pagination },
      }),
    );
  }

  getFeed$(): Observable<AnimeFeed> {
    return this.http.get<AnimeFeed>(`${this.apiUrl}/feed`);
  }

  async search(
    query: string,
    pagination: BasePagination,
  ): Promise<PaginationResponse<BaseAnime>> {
    return firstValueFrom(
      this.http.get<PaginationResponse<BaseAnime>>(`${this.apiUrl}/search`, {
        params: { query, ...pagination },
      }),
    );
  }

  liteSearch$(query: string) {
    return this.http.get<Anime[]>(`${this.apiUrl}/search/lite`, {
      params: { QueryString: query },
    });
  }

  async liteSearch(query: string): Promise<Anime[]> {
    return firstValueFrom(this.liteSearch$(query));
  }

  filter$(params: AnimeFilterStruct): Observable<PaginationResponse<Anime>> {
    return this.http.get<PaginationResponse<Anime>>(`${this.apiUrl}/filter`, {
      params: { ...params },
    });
  }

  async getRandom(): Promise<number> {
    return firstValueFrom(this.http.get<number>(`${this.apiUrl}/random`));
  }

  getById$(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.apiUrl}/${id}`);
  }

  async getById(id: number): Promise<Anime> {
    return await firstValueFrom(this.getById$(id));
  }
}
