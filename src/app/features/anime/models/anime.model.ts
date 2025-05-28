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

interface AnimeFilterSelectBase {
  title: string;
  options: { value: string; title: string }[];
}

export interface AnimeFilterSingleSelect extends AnimeFilterSelectBase {}

export interface AnimeFilterMultipleSelect extends AnimeFilterSelectBase {}

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
