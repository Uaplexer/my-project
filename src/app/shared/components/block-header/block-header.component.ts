import { Component, input } from '@angular/core';

@Component({
  selector: 'app-block-header',
  templateUrl: './block-header.component.html',
  styleUrl: './block-header.component.scss',
})
export class BlockHeaderComponent {
  title = input<string>();
}
