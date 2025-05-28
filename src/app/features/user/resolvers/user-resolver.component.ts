import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '@core/services/api/user.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = Number(route.paramMap.get('id')!);

    return this.userService.getById$(id).pipe(
      catchError((error) => {
        console.error('User not found', error);
        this.router.navigate(['/404']);
        return EMPTY;
      }),
    );
  }
}
