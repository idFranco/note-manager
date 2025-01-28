import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            RouterModule,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    var authenticated = this.isAuthenticated();

    if(authenticated)
      this.router.navigate(['/administration']);
    else
      this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    localStorage.removeItem('authToken');
  }

}
