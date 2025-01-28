import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { materialMenuImports } from '../../material.imports';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [RouterModule,
            CommonModule,
            ...materialMenuImports],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements AfterViewInit {

   title = 'Note manager';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    var authenticated = this.isAuthenticated();

    if(authenticated)
      this.router.navigate(['/administration']);
    else
      this.logout();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
