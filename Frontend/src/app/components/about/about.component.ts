// components/about/about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="page-section">
      <div class="container">
        <h2>About Our Parking Facility</h2>
        <div class="about-content">
          <p>We provide secure and convenient parking solutions 24/7</p>
          <div class="features">
            <div *ngFor="let feature of features" class="feature-card">
              <h3>{{feature.title}}</h3>
              <p>{{feature.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .feature-card {
      background: var(--white);
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
  `
})
export class AboutComponent {
  features = [
    { title: 'Secure Parking', description: '24/7 monitored parking with CCTV surveillance' },
    { title: 'Easy Payment', description: 'Multiple payment options including mobile payments' },
    { title: 'Convenient Location', description: 'Centrally located with easy access' }
  ];
}
