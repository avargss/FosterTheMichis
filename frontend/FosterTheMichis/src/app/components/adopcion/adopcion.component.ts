import { Component } from '@angular/core';
import { Michi } from '../../model/michis';
import { MichisService } from '../../services/michis.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-adopcion',
  imports: [NgFor],
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.css'
})
export class AdopcionComponent {

  nonAdoptableMichis: Michi[] = [];
  adoptableMichis: Michi[] = [];

  constructor(private michisService: MichisService) { }

  ngOnInit() {
    this.loadNonAdoptableMichis();
    this.loadAdoptableMichis();
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
