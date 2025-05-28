import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '@features/user/models/user.model';
import { LucideAngularModule, CalendarIcon, UserPenIcon } from 'lucide-angular';
import { UserProfileSideBarAvatarComponent } from './avatar/user-profile-sidebar-avatar.component';
import { AnimeListStatistics } from '@features/anime-list/models/anime-list.model';

@Component({
  selector: 'user-profile-sidebar',
  imports: [LucideAngularModule, DatePipe, UserProfileSideBarAvatarComponent],
  templateUrl: './user-profile-sidebar.component.html',
  styleUrl: './user-profile-sidebar.component.scss',
})
export class UserProfileSidebarComponent {
  user = input.required<User>();
  userAnimeListStatistics = input<AnimeListStatistics | null>();
  currentUser = input<User>();

  get isCurrentUserProfileOwner() {
    return this.user().id === this.currentUser()?.id;
  }

  readonly CalendarIcon = CalendarIcon;
  readonly UserPenIcon = UserPenIcon;
}
