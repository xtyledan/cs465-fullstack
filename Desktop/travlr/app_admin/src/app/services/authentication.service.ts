import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BROWSER_STORAGE } from '../storage';
import { TripDataService } from './trip-data.service';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'token';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  /**
   * Retrieves the JWT token from localStorage
   * @returns The stored token or null if not found
   */
  getToken(): string | null {
    try {
      return this.storage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }

  /**
   * Stores the JWT token in localStorage
   * @param token The JWT token to store
   */
  saveToken(token: string): void {
    try {
      this.storage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
      throw error;
    }
  }

  /**
   * Removes the JWT token from localStorage and logs out the user
   */
  logout(): void {
    try {
      this.storage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  }

  /**
   * Checks if the user is logged in by validating the JWT token
   * @returns True if user has a valid, non-expired token
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      // Decode JWT payload to check expiration
      const payload = this.decodeJWTPayload(token);
      if (!payload || !payload.exp) {
        return false;
      }

      // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }

  /**
   * Extracts user information from the JWT token
   * @returns User object with email and name, or null if not available
   */
  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token || !this.isLoggedIn()) {
      return null;
    }

    try {
      const payload = this.decodeJWTPayload(token);
      if (!payload || !payload.email || !payload.name) {
        return null;
      }

      const user = new User();
      user.email = payload.email;
      user.name = payload.name;
      return user;
    } catch (error) {
      console.error('Error extracting user from token:', error);
      return null;
    }
  }

  /**
   * Authenticates a user with the API and stores the returned token
   * @param user User object with email and name
   * @param password User's password
   * @returns Observable<boolean> indicating success or failure
   */
  login(user: User, password: string): Observable<boolean> {
    return this.tripDataService.login(user, password).pipe(
      map((response: AuthResponse) => {
        if (response && response.token) {
          this.saveToken(response.token);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  /**
   * Registers a new user with the API and stores the returned token
   * @param user User object with email and name
   * @param password User's password
   * @returns Observable<boolean> indicating success or failure
   */
  register(user: User, password: string): Observable<boolean> {
    return this.tripDataService.register(user, password).pipe(
      map((response: AuthResponse) => {
        if (response && response.token) {
          this.saveToken(response.token);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return of(false);
      })
    );
  }

  /**
   * Decodes the JWT payload without verification (client-side only)
   * @param token The JWT token to decode
   * @returns The decoded payload object
   */
  private decodeJWTPayload(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const payload = parts[1];
      // Add padding if needed for base64 decoding
      const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
      const decodedPayload = atob(paddedPayload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding JWT payload:', error);
      throw error;
    }
  }
}