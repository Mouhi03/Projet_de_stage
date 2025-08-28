import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginFormComponent {
  @Output() switchToForgot = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();

  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  showError: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email === 'user@test.com' && this.password === 'user123') {
      this.isLoading = true;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    } else {
      this.showError = true;
    }
  }

  onForgotPassword() {
    this.switchToForgot.emit();
  }

  onSignUp() {
    this.switchToSignup.emit();
  }
}
