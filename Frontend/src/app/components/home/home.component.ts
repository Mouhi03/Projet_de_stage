// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Reservation {
  name: string;
  badgeNumber: string;
  carModel: string;
  plateNumber: string;
}

interface ParkingSpot {
  reserved: boolean;
  reservation: Reservation | null;
}

interface AdminSettings {
  allowOverbooking: boolean;
  autoAssign: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentView: string = 'parking';
  parkingSpots: ParkingSpot[] = [];
  totalSpots: number = 10;
  showModal: boolean = false;
  notificationPrefs: string = 'email';
  adminSettings: AdminSettings = {
    allowOverbooking: false,
    autoAssign: true
  };

  newReservation: Reservation = {
    name: '',
    badgeNumber: '',
    carModel: '',
    plateNumber: ''
  };

  selectedSpotIndex: number = 0;

  // Contact Form Properties
  contactFormData = {
    name: '',
    badgeNumber: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    message: '',
    urgent: false
  };

  isSending: boolean = false;
  showSuccessPopup: boolean = false;
  successTitle: string = '';
  successMessage: string = '';

  // Plan Selection Properties
  selectedPlan: string = '';
  showPlanModal: boolean = false;
  paymentMethod: string = 'payroll';
  agreeTerms: boolean = false;

  // Plan pricing information
  planPrices = {
    normal: '85MAD',
    premium: '120MAD',
    deluxe: '180MAD'
  };

  constructor() {
    this.initializeParkingSpots();
  }

  initializeParkingSpots(): void {
    this.parkingSpots = Array(this.totalSpots).fill(null).map(() => ({
      reserved: false,
      reservation: null
    }));
  }

  showView(view: string): void {
    this.currentView = view;
  }

  openReservationModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newReservation = {
      name: '',
      badgeNumber: '',
      carModel: '',
      plateNumber: ''
    };
  }

  submitReservation(): void {
    if (this.selectedSpotIndex >= 0 && this.selectedSpotIndex < this.parkingSpots.length) {
      this.parkingSpots[this.selectedSpotIndex].reserved = true;
      this.parkingSpots[this.selectedSpotIndex].reservation = { ...this.newReservation };
      this.closeModal();
    }
  }

  cancelReservation(index: number): void {
    if (index >= 0 && index < this.parkingSpots.length) {
      this.parkingSpots[index].reserved = false;
      this.parkingSpots[index].reservation = null;
    }
  }

  updateParkingConfig(): void {
    if (this.totalSpots > 0 && this.totalSpots <= 100) {
      this.initializeParkingSpots();
    } else {
      alert('Please enter a number between 1 and 100');
    }
  }

  saveSettings(): void {
    console.log('Settings saved:', {
      notificationPrefs: this.notificationPrefs,
      adminSettings: this.adminSettings
    });
    alert('Settings saved successfully!');
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      window.location.href = './login';

    }
  }

  get availableSpots(): number[] {
    const available: number[] = [];
    this.parkingSpots.forEach((spot, index) => {
      if (!spot.reserved) {
        available.push(index);
      }
    });
    return available;
  }

  // Plan Selection Methods
  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.showPlanModal = true;
  }

  closePlanModal(): void {
    this.showPlanModal = false;
    this.selectedPlan = '';
    this.paymentMethod = 'payroll';
    this.agreeTerms = false;
  }

  confirmPlanSelection(): void {
    this.showPlanModal = false;
    this.successTitle = 'Plan Selected Successfully!';
    this.successMessage = `Your ${this.selectedPlan} parking plan has been activated. Payment will be processed via ${this.paymentMethod}.`;
    this.showSuccessPopup = true;
    this.selectedPlan = '';
    this.paymentMethod = 'payroll';
    this.agreeTerms = false;
  }

  getPlanPrice(plan: string): string {
    return this.planPrices[plan as keyof typeof this.planPrices] || '';
  }

  // Contact Form Methods
  submitContactForm(): void {
    if (this.isSending) return;

    // Form validation
    if (!this.contactFormData.name || !this.contactFormData.badgeNumber ||
        !this.contactFormData.email || !this.contactFormData.department ||
        !this.contactFormData.subject || !this.contactFormData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.contactFormData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Simulate sending
    this.isSending = true;

    // Simulate API call delay
    setTimeout(() => {
      this.isSending = false;
      this.successTitle = 'Message Sent Successfully!';
      this.successMessage = 'Thank you for contacting us. We\'ll get back to you within 24 hours.';
      this.showSuccessPopup = true;

      // Reset form
      this.contactFormData = {
        name: '',
        badgeNumber: '',
        email: '',
        phone: '',
        department: '',
        subject: '',
        message: '',
        urgent: false
      };
    }, 2000);
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }
}
