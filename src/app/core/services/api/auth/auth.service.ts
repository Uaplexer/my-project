import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  UserLoginRequest,
  UserRegisterRequest,
} from '@features/user/models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.baseApiUrl}/user`;

  private readonly http = inject(HttpClient);

  login(credentials: UserLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data: UserRegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }
}
