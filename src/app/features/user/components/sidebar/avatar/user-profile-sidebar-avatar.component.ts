import {
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { UserService } from '@core/services/api/user.service';
import { User } from '@features/user/models/user.model';
import { LucideAngularModule, PencilIcon } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-profile-sidebar-avatar',
  imports: [LucideAngularModule],
  templateUrl: './user-profile-sidebar-avatar.component.html',
  styleUrl: './user-profile-sidebar-avatar.component.scss',
})
export class UserProfileSideBarAvatarComponent implements OnDestroy {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  user = input.required<User>();
  isCurrentUserProfileOwner = input.required<boolean>();

  readonly userService = inject(UserService);

  private destroy$ = new Subject<void>();

  onEditAvatar(): void {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.userService
        .uploadAvatar(file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log('Avatar uploaded!', res.avatarUrl);
            this.user().avatars = res.avatarUrl;
          },
          error: (err) => {
            console.error('Error while uploading:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly PencilIcon = PencilIcon;
}
