import { Component } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'minimoUI';

  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
    
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.checkAuthentication();
    this.router.navigate(['/login']);

  }
}
