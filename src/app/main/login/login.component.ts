import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  entityForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.entityForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  verifyValidTouched(input: string) {
    return (
      !this.entityForm.get(input)?.valid &&
      (this.entityForm.get(input)?.touched || this.entityForm.get(input)?.dirty)
    );
  }

  validateClass(input: string) {
    return {
      'is-invalid': this.verifyValidTouched(input),
    };
  }

  doLogin() {
    if (this.entityForm.get('password')?.value === 'root') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/contacts']);
    }
  }
}
