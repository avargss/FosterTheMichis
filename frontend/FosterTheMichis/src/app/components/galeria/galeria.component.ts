import { Component } from '@angular/core';
import { Michi } from '../../model/michis';
import { MichisService } from '../../services/michis.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-galeria',
  imports: [NgFor, NgIf],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  nonAdoptableMichis: Michi[] = [];
  adoptableMichis: Michi[] = [];

  constructor(private michisService: MichisService) {}

  ngOnInit() {
    this.loadNonAdoptableMichis();
  }

  // Método para cargar los gatos no adoptables desde la base de datos
  loadNonAdoptableMichis(): void {
    this.michisService.getNonAdoptableMichis().subscribe((michis) => {
      this.nonAdoptableMichis = michis;
    });
  }

  // Método para cargar los gatos adoptables desde la base de datos
  loadAdoptableMichis(): void {
    this.michisService.getAdoptableMichis().subscribe((michis) => {
      this.adoptableMichis = michis;
    });
  }
}
