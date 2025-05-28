import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FunnelIcon, LucideAngularModule, SearchIcon } from 'lucide-angular';
import { SearchBarAnimeListComponent } from './anime-list/search-bar-anime-list.component';
import { RouterModule } from '@angular/router';
import { DynamicInputComponent } from '@shared/components/inputs/dynamic/dynamic-input.component';
import { AnimeSearchStore } from '@core/stores/anime-search.store';

@Component({
  selector: 'search-bar',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchBarAnimeListComponent,
    LucideAngularModule,
    RouterModule,
    DynamicInputComponent,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  store = inject(AnimeSearchStore);

  readonly SearchIcon = SearchIcon;
  readonly FunnelIcon = FunnelIcon;
}
