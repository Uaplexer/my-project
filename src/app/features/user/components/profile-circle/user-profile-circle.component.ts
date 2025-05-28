import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseUser } from '@features/user/models/user.model';

@Component({
  selector: 'app-profile-circle',
  imports: [RouterModule],
  templateUrl: './user-profile-circle.component.html',
  styleUrl: './user-profile-circle.component.scss',
})
export class UserProfileCircleComponent {
  user = input.required<BaseUser>();
}
