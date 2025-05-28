import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: 'img[fallback]',
})
export class FallbackImageDirective {
  fallback = input.required<string>();

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.fallback();
  }
}
