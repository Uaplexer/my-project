import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TitledEntity } from '@shared/models/common.model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AnimeReferenceService {
  private apiUrl = `${environment.baseApiUrl}/anime/references`;

  readonly http = inject(HttpClient);

  async getAllGenres(): Promise<TitledEntity[]> {
    return await firstValueFrom(
      this.http.get<TitledEntity[]>(`${this.apiUrl}/genres`),
    );
  }

  async getAllThemes(): Promise<TitledEntity[]> {
    return await firstValueFrom(
      this.http.get<TitledEntity[]>(`${this.apiUrl}/themes`),
    );
  }

  async getAllTypes(): Promise<TitledEntity[]> {
    return await firstValueFrom(
      this.http.get<TitledEntity[]>(`${this.apiUrl}/types`),
    );
  }

  async getAllStatuses(): Promise<TitledEntity[]> {
    return await firstValueFrom(
      this.http.get<TitledEntity[]>(`${this.apiUrl}/statuses`),
    );
  }

  async getAllAgeRatings(): Promise<TitledEntity[]> {
    return await firstValueFrom(
      this.http.get<TitledEntity[]>(`${this.apiUrl}/age-ratings`),
    );
  }

  async getAllSources(): Promise<TitledEntity[]> {
    return await firstValueFrom(
      this.http.get<TitledEntity[]>(`${this.apiUrl}/sources`),
    );
  }
}
