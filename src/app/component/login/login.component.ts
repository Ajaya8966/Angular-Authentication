import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AppConfig } from '@workspace/shared-ui';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appConf: AppConfig
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.showValidationErrors(this.loginForm);
      alert('Please enter your credentials correctly.');
      return;
    }

    const { username, password } = this.loginForm.value;
    console.log('Login payload:', { username, password });

    this.authService.login(username, password).subscribe({
      next: () => {
        alert('Login successful!');
        this.loginForm.reset();
        this.router.navigate(['/content']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Invalid credentials. Please try again.');
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