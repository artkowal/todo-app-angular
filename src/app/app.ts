import { Component } from '@angular/core';
import { Layout } from './components/dashboard/layout/layout';
import { RegistrationForm } from './components/registration-form/registration-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Layout, RegistrationForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}