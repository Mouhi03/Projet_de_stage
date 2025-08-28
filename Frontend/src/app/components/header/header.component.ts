// components/header/header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="site-header">
      <div class="container">
        <div class="logo">
          <h1>Parking<span>Plus</span></h1>
        </div>
        <nav class="main-nav">
          <ul>
            <li><a routerLink="/" class="nav-link">Home</a></li>
            <li><a routerLink="/about" class="nav-link">About</a></li>
            <li><a routerLink="/login" class="nav-link">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: `
    .site-header {
      background-color: var(--primary-color);
      color: var(--white);
      padding: 20px 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .logo h1 {
      margin: 0;
      font-size: 28px;
    }
    .logo span {
      color: var(--secondary-color);
    }
    .main-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 20px;
    }
    .main-nav a {
      color: var(--white);
      text-decoration: none;
      font-weight: 500;
      padding: 5px 0;
      transition: color 0.3s;
    }
    .main-nav a:hover {
      color: var(--secondary-color);
    }
  `
})
export class HeaderComponent {}
