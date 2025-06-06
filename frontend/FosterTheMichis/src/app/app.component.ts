import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'FosterTheMichis';

  constructor(private translate: TranslateService, private router: Router) {
    // Registramos idiomas
    this.translate.addLangs(['es', 'en']);
    // Leemos localStorage o usamos 'es' por defecto
    const saved = localStorage.getItem('lang');
    const initialLang = saved === 'en' ? 'en' : 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(initialLang);

  }

  // Método para verificar si el footer debe mostrarse
    shouldShowFooter(): boolean {
      const currentRoute = this.router.url;
      return !(currentRoute === '/login' || currentRoute === '/register');
    }
}