import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent {
  placeholder = input<string>('');
  inputValueChanged = output<string>();

  onValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValueChanged.emit(value);
  }
}
