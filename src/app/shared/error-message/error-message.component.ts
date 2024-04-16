import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMessageService } from './error-message.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl;
  @Input() label!: string;

  constructor(private error: ErrorMessageService) {}

  get errorMessage() {
    for (const propertyName in this.control?.errors) {
      if (this.control?.errors.hasOwnProperty(propertyName)) {
        return this.error.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
