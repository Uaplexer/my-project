import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Anime } from '../models/anime.model';
import { AnimeService } from '@core/services/api/anime/anime.service';

@Injectable({ providedIn: 'root' })
export class AnimeResolver implements Resolve<Anime> {
  private animeService = inject(AnimeService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<Anime> {
    const id = Number(route.paramMap.get('id')!);

    return this.animeService.getById$(id).pipe(
      catchError((error) => {
        console.error('Anime not found', error);
        this.router.navigate(['/404']);
        return EMPTY;
      }),
    );
  }
}
