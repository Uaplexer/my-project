import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ShuffleIcon } from 'lucide-angular';

@Component({
  selector: 'app-action-links',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './action-links.component.html',
  styleUrl: './action-links.component.scss',
})
export class ActionLinksComponent {
  readonly ShuffleIcon = ShuffleIcon;
}
