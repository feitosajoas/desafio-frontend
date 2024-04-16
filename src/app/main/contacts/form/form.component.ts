import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, take, tap, throwError } from 'rxjs';
import { Contact } from '../../../core/models/contact';
import { ContactServiceService } from '../../../core/service/contact-service.service';
import { InputComponent } from '../../../shared/input/input.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  entityForm!: FormGroup;
  contact!: Contact;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactServiceService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.entityForm = this.fb.group({
      contato_nome: ['', [Validators.required, Validators.max(100)]],
      contato_email: ['', [Validators.required, Validators.max(255)]],
      contato_celular: ['', [Validators.required]],
      contato_telefone: ['', [Validators.required]],
      contato_sn_favorito: [false],
      contato_sn_ativo: [true],
      contato_dh_cad: [''],
    });

    this.activatedRouter.params.pipe(take(1)).subscribe((x) => {
      if (x['id']) {
        this.contactService.getById(x['id']).subscribe((data) => {
          // console.log(data);
          this.contact = data;
          this.loadDataForm();
        });
      }
    });
  }

  loadDataForm() {
    this.entityForm.get('contato_nome')?.setValue(this.contact.contato_nome);
    this.entityForm.get('contato_email')?.setValue(this.contact.contato_email);
    this.entityForm.get('contato_celular')?.setValue(this.contact.phoneNumber);
    this.entityForm
      .get('contato_telefone')
      ?.setValue(this.contact.contato_telefone);
    this.entityForm
      .get('contato_sn_favorito')
      ?.setValue(this.contact.contato_sn_favorito === 1 ? true : false);
    this.entityForm
      .get('contato_sn_ativo')
      ?.setValue(this.contact.contato_sn_ativo === 1 ? true : false);
    this.entityForm
      .get('contato_dh_cad')
      ?.setValue(this.contact.contato_dh_cad);
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

  doSave() {
    debugger;
    if (this.entityForm.valid) {
      if (this.contact) {
        const sendForm = {
          contact_id: this.contact.contato_id,
          contato_nome: this.entityForm.value.contato_nome,
          contato_email: this.entityForm.value.contato_email,
          phoneNumber: this.entityForm.value.contato_celular,
          contato_telefone: this.entityForm.value.contato_telefone,
          contato_sn_favorito:
            this.entityForm.value.contato_sn_favorito === true ? 1 : 0,
          contato_sn_ativo:
            this.entityForm.value.contato_sn_ativo === true ? 1 : 0,
          contato_dh_cad: this.contact.contato_dh_cad,
        };

        this.contactService
          .update(this.contact.contato_id, sendForm)
          .pipe(
            tap(() => {
              window.alert('Sucesso! Seu novo contato foi editado.');
              this.router.navigate(['/contacts']);
            }),
            catchError((error: any) => {
              window.alert(error.error);
              return throwError(error.error);
            })
          )
          .subscribe((error) => {
            window.alert(error);
          });
      } else {
        const newDate = new Date();
        const sendForm: any = {
          contato_nome: this.entityForm.value.contato_nome,
          contato_email: this.entityForm.value.contato_email,
          phoneNumber: this.entityForm.value.contato_celular,
          contato_telefone: this.entityForm.value.contato_telefone,
          contato_sn_favorito:
            this.entityForm.value.contato_sn_favorito === true ? 1 : 0,
          contato_sn_ativo:
            this.entityForm.value.contato_sn_ativo === true ? 1 : 0,
          contato_dh_cad: newDate,
        };

        this.contactService
          .create(sendForm)
          .pipe(
            tap(() => {
              window.alert('Sucesso! Seu novo contato foi registrado.');
              this.router.navigate(['/contacts']);
            }),
            catchError((error: any) => {
              window.alert(error.error);
              return throwError(error.error);
            })
          )
          .subscribe();
      }
    }
  }
}
