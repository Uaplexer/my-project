import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseUser } from '@features/user/models/user.model';

@Component({
  selector: 'app-profile-square',
  imports: [RouterModule],
  templateUrl: './user-profile-square.component.html',
  styleUrl: './user-profile-square.component.scss',
})
export class UserProfileSquareComponent {
  user = input.required<BaseUser>();
}
