import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLanguageMenuOpen = false;
  currentLang: string;

  constructor(private translate: TranslateService) {
    // Registramos los idiomas disponibles
    this.translate.addLangs(['es', 'en']);

    // Forzamos siempre el arranque en español
    this.translate.setDefaultLang('es');
    this.currentLang = 'es';
    this.translate.use('es');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    this.isLanguageMenuOpen = false;
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }
}
