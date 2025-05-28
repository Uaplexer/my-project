import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimePlayerStore } from '@core/stores/anime-player.store';
import { CircleIcon, LucideAngularModule } from 'lucide-angular';
import { DynamicInputComponent } from '../../../../shared/components/inputs/dynamic/dynamic-input.component';

@Component({
  selector: 'anime-episode-list',
  imports: [LucideAngularModule, FormsModule, DynamicInputComponent],
  templateUrl: './anime-episode-list.component.html',
  styleUrls: ['./anime-episode-list.component.scss'],
})
export class AnimeEpisodeListComponent {
  playerStore = inject(AnimePlayerStore);

  skeletonItems = Array(10).fill(0);

  readonly CircleIcon = CircleIcon;
}
