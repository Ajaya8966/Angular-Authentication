import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '@workspace/shared-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  showPassword(e: any) {
    const el: any = e.target;
    const inputElement = el
      .closest('.form-group')
      .querySelector('input[type="password"], input[type="text"]');

    if (inputElement) {
      if (inputElement.type === 'password') {
        inputElement.type = 'text';
        el.classList.remove('ni-eye');
        el.classList.add('ni-eye-off');
      } else {
        inputElement.type = 'password';
        el.classList.remove('ni-eye-off');
        el.classList.add('ni-eye');
      }
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.showValidationErrors(this.registerForm);
      alert('Please fill all required fields correctly.');
      return;
    }

    const payload = this.registerForm.value;
    const api = 'api/signup'; 
    console.log("data register",payload);

    this.apiService.post(api, payload).subscribe({
      next: (response: any) => {
        console.log(response);
        this.registerForm.reset();
        alert('Signup successful!');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
      },
    });
  }

  private showValidationErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }
}