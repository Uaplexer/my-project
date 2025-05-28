import { Injectable, signal, computed } from '@angular/core';
import { Episode } from '@features/anime-episodes/models/episode.model';

@Injectable({ providedIn: 'root' })
export class EpisodePlayerService {
  private _episodes = signal<Episode[]>([]);
  private _selectedEpisode = signal<Episode | null>(null);
  private _searchQuery = signal('');

  filteredEpisodes = computed(() => {
    const query = this._searchQuery().trim().toLowerCase();
    const episodes = this._episodes();
    if (!query) return episodes;
    return episodes.filter(
      (ep) =>
        ep.episode.toString().includes(query) ||
        ep.name.toLowerCase().includes(query),
    );
  });

  episodes = this._episodes.asReadonly();
  selectedEpisode = this._selectedEpisode.asReadonly();
  searchQuery = this._searchQuery.asReadonly();

  setEpisodes(episodes: Episode[]) {
    this._episodes.set(episodes);
    if (episodes.length > 0 && !this._selectedEpisode()) {
      this._selectedEpisode.set(episodes[0]);
    }
  }

  selectEpisode(episode: Episode) {
    this._selectedEpisode.set(episode);
  }

  updateSearchQuery(query: string) {
    this._searchQuery.set(query);
  }
}
