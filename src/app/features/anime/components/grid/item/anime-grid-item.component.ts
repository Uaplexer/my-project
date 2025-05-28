import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimeListDropdownMenuComponent } from '@features/anime-list/components/dropdown-menu/anime-list-dropdown-menu.component';
import { Anime } from '@features/anime/models/anime.model';
import { FallbackImageDirective } from '@shared/directives/fallback-image.directive';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'anime-grid-item',
  imports: [
    RouterModule,
    LucideAngularModule,
    AnimeListDropdownMenuComponent,
    FallbackImageDirective,
  ],
  templateUrl: './anime-grid-item.component.html',
  styleUrl: './anime-grid-item.component.scss',
})
export class AnimeGridItemComponent {
  anime = input.required<Anime>();
}
