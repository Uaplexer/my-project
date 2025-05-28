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
