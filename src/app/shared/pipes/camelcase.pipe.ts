import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
  standalone: true,
})
export class CamelCaseFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/[()]/g, '')
      .split(/[\s-]/g)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
