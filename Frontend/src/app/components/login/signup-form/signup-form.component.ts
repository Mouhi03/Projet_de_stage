import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['../login.component.scss']
})
export class SignupFormComponent {
  @Output() switchToLogin = new EventEmitter<void>();

  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  showError: boolean = false;

  onSubmit() {
    // Validate all fields are filled and passwords match
    if (!this.fullName || !this.email || !this.password || this.password !== this.confirmPassword) {
      this.showError = true;
      return;
    }

    this.isLoading = true;
    this.showError = false;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      // Handle successful signup (e.g., redirect)
    }, 1500);
  }

  onSignIn() {
    this.switchToLogin.emit();
  }
}
