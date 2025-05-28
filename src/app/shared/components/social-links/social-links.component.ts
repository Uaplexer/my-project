import { Component } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  public readonly socialLinks = [
    {
      icon: 'assets/icons/discord.svg',
      alt: 'Discord',
      link: 'https://discord.gg/3k4v2q5',
    },
    {
      icon: 'assets/icons/telegram.svg',
      alt: 'Telegram',
      link: 'https://t.me/+0g1k2v2q5',
    },
    {
      icon: 'assets/icons/reddit.svg',
      alt: 'Reddit',
      link: 'https://discord.gg/3k4v2q5',
    },
  ];
}
