import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BasePagination,
  PaginationResponse,
} from '@shared/models/pagination.model';
import { BasePost } from '@features/post/models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = '/posts';

  readonly http = inject(HttpClient);

  getAll(pagination: BasePagination): Observable<PaginationResponse<BasePost>> {
    return this.http.get<PaginationResponse<BasePost>>(this.apiUrl, {
      params: { ...pagination },
    });
  }
  getById(id: number): Observable<BasePost> {
    return this.http.get<BasePost>(`${this.apiUrl}/${id}`);
  }
  getLatest(
    pagination: BasePagination,
  ): Observable<PaginationResponse<BasePost>> {
    return this.http.get<PaginationResponse<BasePost>>(
      `${this.apiUrl}/latest`,
      { params: { ...pagination } },
    );
  }
  // getUserPosts(userId: number, pagination: any): Observable<PaginationResponse<BasePost>> {
  //     return this.http.get<PaginationResponse<BasePost>>(`${this.apiUrl}/user/${userId}`, { params: pagination });
  // }
}
