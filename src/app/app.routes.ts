import { Routes } from '@angular/router';
import { Layout } from './components/dashboard/layout/layout';
import { RegistrationForm } from './components/registration-form/registration-form';

export const routes: Routes = [
  { path: '', component: Layout },
  { path: 'register', component: RegistrationForm },
  { path: '**', redirectTo: '' }
];