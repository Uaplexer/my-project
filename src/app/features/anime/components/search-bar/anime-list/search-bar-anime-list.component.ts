import { Component, input } from '@angular/core';
import { SearchBarAnimeListCardComponent } from './card/search-bar-anime-list-card.component';
import { Anime } from '@features/anime/models/anime.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'search-bar-anime-list',
  imports: [SearchBarAnimeListCardComponent, RouterModule],
  templateUrl: './search-bar-anime-list.component.html',
  styleUrl: './search-bar-anime-list.component.scss',
})
export class SearchBarAnimeListComponent {
  animeList = input.required<Anime[]>();
}
