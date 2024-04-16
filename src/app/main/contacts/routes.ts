import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

export default [
  {
    path: '',
    component: ContactsComponent,
    children: [
      {
        path: '',
        title: 'Lista de contatos',
        component: ListComponent,
      },
      {
        path: 'new',
        title: 'Criar novo contato',
        component: FormComponent,
      },
      {
        path: 'edit/:id',
        title: 'Editar contato',
        component: FormComponent,
      },
    ],
  },
] as Routes;
