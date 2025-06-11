import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MichisService } from '../../services/michis.service';
import { AuthService } from '../../services/auth.service';
import { Michi } from '../../model/michis';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ruleta',
  imports: [NgFor, TranslateModule],
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit, AfterViewInit {
  michis: Michi[] = [];
  selectedMichi: Michi | null = null;
  isSpinning = false;
  currentUserId!: number;

  // Capturamos las referencias a los elementos .michi
  @ViewChildren('michiElem') michiElems!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private michisService: MichisService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMichis();
    this.authService.getUserData().subscribe({
      next: user => { if (user?.id) this.currentUserId = user.id; },
      error: () => console.warn('No se pudo obtener el usuario autenticado.')
    });
  }

  ngAfterViewInit(): void {
    // Re-posicionar cada vez que cambian los elementos
    this.michiElems.changes.subscribe(() => this.positionMichis());
  }

  loadMichis(): void {
    this.michisService.getAdoptableMichis().subscribe({
      next: michis => {
        this.michis = michis;
        // Angular actualizará la vista y disparará el subscription en AfterViewInit
      },
      error: err => {
        console.error('Error al cargar los michis:', err);
        Swal.fire('Error', 'No se pudieron cargar los michis.', 'error');
      }
    });
  }

  positionMichis(): void {
    const elements = this.michiElems.toArray();
    const total = elements.length;
    if (total === 0) return;
    const radius = 200;

    elements.forEach((elRef, i) => {
      const angle = (i / total) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const el = elRef.nativeElement;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  spinRoulette(): void {
    if (this.isSpinning || this.michis.length === 0) return;
    this.isSpinning = true;
    this.selectedMichi = null;

    const spinDuration = 5000;
    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      const idx = Math.floor(Math.random() * this.michis.length);
      this.selectedMichi = this.michis[idx];
      elapsed += interval;
      if (elapsed >= spinDuration) {
        clearInterval(timer);
        this.isSpinning = false;
        if (this.selectedMichi) {
          Swal.fire({
            title: '¡Michi seleccionado!',
            text: `${this.selectedMichi.name} ha sido seleccionado.`,
            imageUrl: this.selectedMichi.photo,
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: 'Añadir a mi lista de adopción'
          }).then(result => {
            if (result.isConfirmed) this.addToAdoptionList(this.selectedMichi!);
          });
        }
      }
    }, interval);
  }

  addToAdoptionList(michi: Michi): void {
    this.michisService.addMichiToAdoptionList(this.currentUserId, michi.id!).subscribe({
      next: () => Swal.fire('¡Éxito!', `${michi.name} ha sido añadido a tu lista de adopción.`, 'success'),
      error: err => {
        console.error('Error al añadir el michi a la lista de adopción:', err);
        Swal.fire('Error', 'No se pudo añadir el michi a tu lista de adopción.', 'error');
      }
    });
  }
}