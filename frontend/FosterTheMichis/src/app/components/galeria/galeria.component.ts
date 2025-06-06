import { Component } from '@angular/core';
import { Michi } from '../../model/michis';
import { MichisService } from '../../services/michis.service';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-galeria',
  imports: [NgFor, RouterLink, TranslateModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  adoptableMichis: Michi[] = [];

  constructor(private michisService: MichisService) {}

  ngOnInit() {
    this.loadAdoptableMichis();
  }

  // Método para cargar los gatos adoptables desde la base de datos
  loadAdoptableMichis(): void {
    this.michisService.getAdoptableMichis().subscribe((michis) => {
      this.adoptableMichis = michis;
    });
  }
}