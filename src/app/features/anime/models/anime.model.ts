import { Episode } from '@features/anime-episodes/models/episode.model';

interface Poster {
  small: string;
  medium: string;
}

export interface BaseAnime {
  id: number;
  title: string;
  score: number;
  description: string;
  season: string;
  type: string;
  source: string;
  status: string;
  minAge: string;
  airedFrom: Date;
  posters: Poster;
}

export interface Anime extends BaseAnime {
  genres: string[];
  themes: string[];
}

export interface AnimeFeed {
  popularOngoings: BaseAnime[];
  mostPopular: Anime[];
  newest: Anime[];
}

export interface FilterChangeEvent {
  name: string;
  value: string;
}

interface AnimeFilterSelectBase {
  title: string;
  options: { value: string; title: string }[];
}

export interface AnimeFilterSingleSelect extends AnimeFilterSelectBase {}

export interface AnimeFilterMultipleSelect extends AnimeFilterSelectBase {}

export type AnimeFilterStruct = Record<string, string | string[]>;

export interface AnimeFilterDTO {
  genres?: string[];
  themes?: string[];
  types?: string[];
  statuses?: string[];
  ageRatings?: string[];
  sources?: string[];
  minScore?: number;
  maxScore?: number;
}

export interface AnimeExternalApiResponse {
  list: {
    id: number;
    in_favorites: number;
    last_change: number;
    announce: string | null;
    code: string;
    description: string;
    names: { ru: string | null; en: string | null; alternative: string | null };
    genres: string[];
    player: { list: Episode[] };
  }[];
  pagination: {
    current_page: number;
    items_per_page: number;
    pages: number;
    total_number: number;
  };
}
