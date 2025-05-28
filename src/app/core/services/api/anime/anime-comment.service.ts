import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BasePagination,
  PaginationResponse,
} from '@shared/models/pagination.model';
import { BaseComment } from '@features/anime-comment/models/anime-comment.model';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AnimeCommentService {
  readonly http = inject(HttpClient);

  private apiUrl = environment.baseApiUrl + '/anime';

  getByAnimeId$(
    animeId: number,
    pagination: BasePagination,
  ): Observable<PaginationResponse<BaseComment>> {
    return this.http.get<PaginationResponse<BaseComment>>(
      `${this.apiUrl}/${animeId}/comments`,
      { params: { ...pagination } },
    );
  }

  addComment$(animeId: number, content: string) {
    return this.http.post<BaseComment>(`${this.apiUrl}/${animeId}/comments`, {
      content,
    });
  }
}
