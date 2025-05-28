import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/api/auth/token.service';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(TokenService).token;

  if (!token) return next(request);

  request = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(request);
};
