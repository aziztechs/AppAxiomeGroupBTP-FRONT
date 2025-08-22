import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isAuthenticated()) {
      // Vérification des rôles si nécessaire
      const requiredRole = route.data['role'] as string;
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        // Redirection vers une page d'accès refusé ou la page d'accueil
        return this.router.createUrlTree(['/dashboard']);
      }
      return true;
    }
    
    // Redirection vers la page de login avec l'URL de retour
    return this.router.createUrlTree(['/login'], { 
      queryParams: { returnUrl: state.url }
    });
  }
}

