import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideInOut } from './login.animations';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ForgotPasswordComponent } from '../login/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LoginFormComponent,
    SignupFormComponent,
    ForgotPasswordComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInOut]
})
export class LoginComponent {
  activeForm: 'login' | 'signup' | 'forgot' = 'login';

  constructor(private router: Router) {}

  toggleForm(form: 'login' | 'signup' | 'forgot') {
    this.activeForm = form;
  }
}
