import { BaseAnime } from '@features/anime/models/anime.model';
import { BaseUser } from '@features/user/models/user.model';

export enum AnimeListTypeEnum {
  WATCHING,
  VIEWED,
  POSTPONED,
  ABANDONED,
}

export type AnimeListType = 'Watching' | 'Viewed' | 'Abandoned' | 'Postponed';

export interface BaseAnimeList {
  id: number;
  type: string;
  animeId: number;
  userId: number;
}

export interface AnimeList extends BaseAnimeList {
  anime: BaseAnime;
  user: BaseUser;
}

export interface AnimeListStatistics {
  watching: number;
  viewed: number;
  postponed: number;
  abandoned: number;
}
