import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CredentialService } from '../services/credential.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSetPasswordGuard implements CanActivate {

  constructor(private credentialService: CredentialService,
              private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const resCredential = await this.credentialService.isMasterPasswordSet();

      if(resCredential[0] !== undefined) {
        console.error('Error from AuthSetPasswordGuard - canActivate - ', resCredential[0].stack);
        this.redirectToInit();
        return false;
      }

      const isMasterPasswordSet = resCredential[1];
      const currentRoute = route.routeConfig?.path;

      if(currentRoute == 'create-credential' && isMasterPasswordSet)
      {
        this.redirectToInit();
        return false;
      }

      if(currentRoute == 'change-credential' && !isMasterPasswordSet) {
        this.redirectToInit();
        return false;
      }
    } catch (error) {
      console.error('Error en canActivate:', error);
      this.redirectToInit();
      return false;
    }
    return true;
  }

  private redirectToInit(): void {
    this.router.navigate(['/login']);
  }
}
