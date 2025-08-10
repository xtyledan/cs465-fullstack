import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html'
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {
    this.editForm = this.formBuilder.group({
      code: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const code = localStorage.getItem('tripCode');
    if (!code) return;
    this.tripDataService.getTrip(code).subscribe({
      next: (trip: Trip) => {
        this.editForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: trip.start ? new Date(trip.start).toISOString().slice(0,16) : '',
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;
    const code = localStorage.getItem('tripCode');
    if (!code) return;
    const trip: Trip = {
      code,
      ...this.editForm.getRawValue(),
    } as unknown as Trip;
    this.tripDataService.updateTrip(trip).subscribe({
      next: () => this.router.navigate([''])
    });
  }
}

