import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly skipAuthEndpoints = ['/login', '/register'];

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if this endpoint should skip authentication
    if (this.shouldSkipAuth(request.url)) {
      return next.handle(request);
    }

    // Get the token from the authentication service
    const token = this.authService.getToken();

    // If no token is available, proceed without adding headers
    if (!token) {
      return next.handle(request);
    }

    // Clone the request and add the Authorization header
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authRequest);
  }

  /**
   * Determines if the request URL should skip authentication
   * @param url The request URL to check
   * @returns True if authentication should be skipped
   */
  private shouldSkipAuth(url: string): boolean {
    return this.skipAuthEndpoints.some(endpoint => url.includes(endpoint));
  }
}