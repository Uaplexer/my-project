import { Routes } from '@angular/router';
import { UserResolver } from '@features/user/resolvers/user-resolver.component';
import { AnimeResolver } from '@features/anime/resolvers/anime.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/pages/anime/home/anime-home-page.component').then(
        (m) => m.AnimeHomePageComponent,
      ),
  },
  {
    path: 'anime/filter',
    loadComponent: () =>
      import('src/app/pages/anime/filter/anime-filter-page.component').then(
        (m) => m.AnimeFilterPageComponent,
      ),
  },
  {
    path: 'anime/:id',
    loadComponent: () =>
      import('src/app/pages/anime/single/anime-single-page.component').then(
        (m) => m.AnimeSinglePageComponent,
      ),
    resolve: { anime: AnimeResolver },
  },
  {
    path: 'anime/:id/watch',
    loadComponent: () =>
      import('src/app/pages/anime/watch/anime-watch-page.component').then(
        (m) => m.AnimeWatchPageComponent,
      ),
    resolve: { anime: AnimeResolver },
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('src/app/pages/user/profile/user-profile-page.component').then(
        (m) => m.UserProfilePageComponent,
      ),
    resolve: { user: UserResolver },
  },
  {
    path: 'test',
    loadComponent: () =>
      import('src/app/pages/other/test-page/test-page.component').then(
        (m) => m.TestPageComponent,
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import(
        'src/app/pages/other/not-found-page/not-found-page.component'
      ).then((m) => m.NotFoundPageComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
