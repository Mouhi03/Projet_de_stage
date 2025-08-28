// components/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; 2023 ParkingPlus. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      background-color: var(--primary-color);
      color: var(--white);
      padding: 30px 0;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-links a {
      color: var(--white);
      text-decoration: none;
      margin-left: 15px;
    }
    .footer-links a:hover {
      text-decoration: underline;
    }
  `
})
export class FooterComponent {}
