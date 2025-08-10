import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripCardComponent } from './trip-card'; // <-- correct class & path

describe('TripCardComponent', () => {
  let component: TripCardComponent;
  let fixture: ComponentFixture<TripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component: include it in imports
      imports: [TripCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
