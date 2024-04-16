import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  providers: [INPUT_FIELD_VALUE_ACCESSOR],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() cssClass: any;
  @Input() isInput: boolean = true;
  @Input() inputType: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() labelName: string = '';
  @Input() isReadOnly = false;
  @Input() control!: any;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
