import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación
import { CommonModule, NgIf } from '@angular/common';
import { Token } from '@angular/compiler';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [NgIf, CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  currentLang = 'es';

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    const saved = localStorage.getItem('lang');
    this.currentLang = saved === 'en' ? 'en' : 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {
    // Suscríbete al estado de autenticación
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Verifica el estado inicial de autenticación
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout(); // Llama al método de logout del servicio
    this.router.navigate(['/']); // Redirige al usuario a la página principal
  }
}