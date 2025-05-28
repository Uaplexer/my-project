import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '@core/services/api/auth/session.service';
import { AnimeListStatisticsStore } from '@core/stores/anime-list-statistics.store';
import { AnimeListListStore } from '@core/stores/anime-list.store';
import { AnimeListListComponent } from '@features/anime-list/components/list/anime-list-list.component';
import { AnimeListType } from '@features/anime-list/models/anime-list.model';
import { UserProfileSidebarComponent } from '@features/user/components/sidebar/user-profile-sidebar.component';
import { User } from '@features/user/models/user.model';

@Component({
  selector: 'app-user-profile-page',
  imports: [UserProfileSidebarComponent, AnimeListListComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss',
  providers: [AnimeListStatisticsStore, AnimeListListStore],
})
export class UserProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sessionService = inject(SessionService);

  readonly animeListStatsStore = inject(AnimeListStatisticsStore);
  readonly animeListListStore = inject(AnimeListListStore);

  readonly user: User = this.route.snapshot.data['user'];
  readonly currentUser = this.sessionService.user;

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadAnimeListStatistics();
    this.loadAnimeLists('Watching');
  }

  loadAnimeListStatistics() {
    this.animeListStatsStore.loadByUserId(this.user.id);
  }

  loadAnimeLists(type: AnimeListType | null, page = 1) {
    this.animeListListStore.loadByType({
      userId: this.user.id,
      type: type,
      pagination: { page: page, pageSize: 6 },
    });
  }

  handleTypeChange(selectedType: AnimeListType) {
    this.loadAnimeLists(selectedType);
  }

  handlePageChange(selectedPage: number) {
    this.loadAnimeLists(this.animeListListStore.type(), selectedPage);
  }
}
