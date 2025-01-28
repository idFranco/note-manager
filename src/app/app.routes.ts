import { Routes } from '@angular/router';
import { CreateCredentialComponent } from './components/login/credential-administration/credential/create-credential.component';
import { AuthSetPasswordGuard } from './core/guards/auth-set-password.guard';
import { ChangeCredentialComponent } from './components/login/credential-administration/credential/change-credential.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-credential',
    component: CreateCredentialComponent,
    canActivate: [AuthSetPasswordGuard]
  },
  {
    path: 'change-credential',
    component: ChangeCredentialComponent,
    canActivate: [AuthSetPasswordGuard]
  },
  {
    path: 'administration',
    loadChildren: () => import('./components/administration/administration.module').then(m => m.admnistrationRoutes)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
