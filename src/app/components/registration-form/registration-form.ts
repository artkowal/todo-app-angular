import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { accountSchema, personalDataSchema } from '../../schemas/registration.schema';
import { zodValidator } from '../../validators/zod.validator';

@Component({
  selector: 'app-registration-form',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatStepperModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
})
export class RegistrationForm {
  private fb = inject(FormBuilder);

  currentStep = signal(1);
  totalSteps = 3

  isSubmitting = signal(false);

  registrationForm: FormGroup = this.fb.group({
    step1: this.fb.group({
      email: ['', [zodValidator(accountSchema.shape.email)]],
      password: ['', [zodValidator(accountSchema.shape.password)]],
      confirmPassword: [''] 
    }, { validators: zodValidator(accountSchema) }),

    step2: this.fb.group({
      firstName: ['', [zodValidator(personalDataSchema.shape.firstName)]],
      lastName: ['', [zodValidator(personalDataSchema.shape.lastName)]],
      phone: ['', [zodValidator(personalDataSchema.shape.phone)]]
    }),

    step3: this.fb.group({
      terms: [false, [Validators.requiredTrue]]
    })
  });

  get accountGroup() { return this.registrationForm.get('step1') as FormGroup; }
  get personalGroup() { return this.registrationForm.get('step2') as FormGroup; }
  get summaryGroup() { return this.registrationForm.get('step3') as FormGroup; }

  nextStep() {
    if (this.currentStep() === 1 && this.accountGroup.invalid) {
      this.accountGroup.markAllAsTouched();
      return;
    }

    if (this.currentStep() === 2 && this.personalGroup.invalid) {
      this.personalGroup.markAllAsTouched();
      return;
    }

    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if(this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

 onSubmit() {
    if(this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false)

      const mockServerError = true;

      if(mockServerError) {
        this.currentStep.set(1);

        setTimeout(() => {
          this.accountGroup.get('email')?.setErrors({ 
            serverError: 'Ten adres e-mail jest już zarejestrowany w systemie.' 
          });
          this.accountGroup.get('email')?.markAsTouched();
        }, 0);
        
      } else {
        alert('Sukces! Konto zostało utworzone.');
        console.log('Wysłane dane:', this.registrationForm.value);
      }
    }, 1500);
  }
}
