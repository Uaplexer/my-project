import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Episode } from '@features/anime-episodes/models/episode.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeEpisodeService {
  private readonly baseApiUrl = 'https://api.anilibria.tv/v3';
  private readonly videoApiUrl = 'https://cache.libria.fun';
  http = inject(HttpClient);

  getByTitle$(title: string) {
    return this.http
      .get<any>(
        `${this.baseApiUrl}/title/search?limit=1&order_by=in_favorites&sort_direction=1&search=${title}`,
      )
      .pipe(
        map((response: any) => {
          const episodes: Episode[] = [];
          const episodeMap = response.list?.[0]?.player?.list || {};

          for (const episode of Object.values(episodeMap) as {
            uuid: string;
            name: string;
            episode: number;
            skips: any;
            hls: any;
          }[]) {
            episodes.push({
              uuid: episode.uuid,
              name: episode.name,
              episode: episode.episode,
              skips: episode.skips,
              hls: {
                fhd: this.videoApiUrl + episode.hls.fhd || null,
                hd: this.videoApiUrl + episode.hls.hd || null,
                sd: this.videoApiUrl + episode.hls.sd || null,
              },
            });
          }

          return episodes;
        }),
      );
  }
}
