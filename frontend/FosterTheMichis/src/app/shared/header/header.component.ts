import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación
import { CommonModule, NgIf } from '@angular/common';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-header',
  imports: [NgIf, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Suscríbete al estado de autenticación
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Verifica el estado inicial de autenticación
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout(); // Llama al método de logout del servicio
    this.router.navigate(['/']); // Redirige al usuario a la página principal
  }
}