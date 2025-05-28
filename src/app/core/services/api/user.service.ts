import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { User } from '@features/user/models/user.model';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.baseApiUrl}/user`;

  private readonly http = inject(HttpClient);

  getById$(userId: number | null): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, {
      withCredentials: true,
    });
  }

  async getById(userId: number | null): Promise<User> {
    return await firstValueFrom(this.getById$(userId));
  }

  self$(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/self`);
  }

  uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post<{ avatarUrl: string }>(
      `${this.apiUrl}/avatar`,
      formData,
    );
  }
}
