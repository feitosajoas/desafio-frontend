import { Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'contacts',
    title: 'Contatos',
    loadChildren: () => import('./main/contacts/routes'),
    canActivate: [authGuard],
  },
];
