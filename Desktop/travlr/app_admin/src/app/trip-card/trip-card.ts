import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',   // <-- must match the file name
  styleUrls: ['./trip-card.css']     // <-- must match the file name
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(private router: Router) {}

  onEdit(): void {
    if (this.trip?.code) {
      localStorage.setItem('tripCode', this.trip.code);
      this.router.navigate(['edit-trip']);
    }
  }
}
