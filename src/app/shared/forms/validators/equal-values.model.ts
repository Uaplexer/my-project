import { AbstractControl } from '@angular/forms';

export function equalValues(first: string, second: string) {
  return (group: AbstractControl) =>
    group.get(first)?.value === group.get(second)?.value
      ? null
      : { valuesNotEqual: true };
}
