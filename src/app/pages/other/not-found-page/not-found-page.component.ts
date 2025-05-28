import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeIcon, LucideAngularModule, PowerOffIcon } from 'lucide-angular';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterModule, LucideAngularModule],
  styleUrl: './not-found-page.component.scss',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  readonly PowerOffIcon = PowerOffIcon;
  readonly HomeIcon = HomeIcon;
}
