import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login.component.scss']
})
export class ForgotPasswordComponent {
  @Output() switchToLogin = new EventEmitter<void>();

  email: string = '';
  isLoading: boolean = false;
  isSubmitted: boolean = false;

  // Add the onSubmit method
  onSubmit() {
    if (!this.email) return;

    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;
    }, 1500);
  }

  onSignIn() {
    this.switchToLogin.emit();
  }
}
