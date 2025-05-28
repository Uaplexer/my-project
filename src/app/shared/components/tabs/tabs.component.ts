import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  tabList = input.required<string[]>();
  currentTab = input<string | null>();

  tabChanged = output<string>();

  onTabChange(tab: string) {
    this.tabChanged.emit(tab);
  }
}
