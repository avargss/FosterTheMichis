import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MichisService } from '../../services/michis.service';
import { AuthService } from '../../services/auth.service';
import { Michi } from '../../model/michis';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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

  @ViewChildren('michiElem') michiElems!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private michisService: MichisService,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadMichis();
    this.authService.getUserData().subscribe({
      next: (user) => {
        if (user?.id) {
          this.currentUserId = user.id;
        }
      },
      error: () => {
        console.warn(this.translate.instant('ROULETTE.USER_FETCH_ERROR'));
      }
    });
  }

  ngAfterViewInit(): void {
    this.michiElems.changes.subscribe(() => this.positionMichis());
  }

  loadMichis(): void {
    this.michisService.getAdoptableMichis().subscribe({
      next: (michis) => {
        this.michis = this.getRandomMichis(michis, 10);
        this.positionMichis();
      },
      error: () => {
        Swal.fire({
          title: this.translate.instant('ROULETTE.ERROR'),
          text: this.translate.instant('ROULETTE.LOAD_ERROR'),
          icon: 'error',
          confirmButtonColor: '#C99D7D'
        });
      }
    });
  }

  getRandomMichis(michis: Michi[], max: number): Michi[] {
    const shuffled = michis.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, max);
  }

  positionMichis(): void {
    const elements = this.michiElems.toArray();
    const total = elements.length;
    if (total === 0) return;
    const radius = 170;

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

    const spinDuration = Math.random() * (6000 - 3000) + 3000;
    const interval = 100;
    let elapsed = 0;
    let currentIndex = 0;

    const timer = setInterval(() => {
      const michiElements = document.querySelectorAll('.michi');
      michiElements.forEach((el) => el.classList.remove('highlighted', 'selected'));

      michiElements[currentIndex].classList.add('highlighted', 'selected');
      this.selectedMichi = this.michis[currentIndex];

      currentIndex = (currentIndex + 1) % this.michis.length;
      elapsed += interval;

      if (elapsed >= spinDuration) {
        clearInterval(timer);
        this.isSpinning = false;

        michiElements.forEach((el) => el.classList.remove('highlighted'));
        if (this.selectedMichi) {
          const selectedIndex = this.michis.indexOf(this.selectedMichi);
          michiElements[selectedIndex].classList.add('selected');

          this.michisService.getAdoptionListByUserId(this.currentUserId).subscribe({
            next: (adoptionList) => {
              const alreadyInList = adoptionList.some((adoptedMichi) => adoptedMichi.id === this.selectedMichi?.id);

              if (alreadyInList) {
                Swal.fire({
                  title: this.translate.instant('ROULETTE.ERROR'),
                  text: this.translate.instant('ROULETTE.ALREADY_IN_LIST_ERROR', { name: this.selectedMichi?.name }),
                  icon: 'error',
                  confirmButtonColor: '#C99D7D'
                });
              } else {
                Swal.fire({
                  title: this.translate.instant('ROULETTE.SELECTED_TITLE'),
                  html: `
                  <div style="text-align: center;">
                    <img src="${this.selectedMichi?.photo}" 
                         style="width: 200px; height: 200px; border-radius: 50%; 
                                box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
                                border: 4px solid #FFD700; margin-bottom: 15px;">
                    <h3 style="color: #C99D7D; margin: 10px 0;">${this.selectedMichi?.name}</h3>
                    <p style="color: #666;">${this.translate.instant('ROULETTE.SELECTED_DESCRIPTION')}</p>
                  </div>`,
                  imageHeight: 200,
                  showCancelButton: true,
                  confirmButtonText: this.translate.instant('ROULETTE.ADD_TO_LIST'),
                  cancelButtonText: this.translate.instant('ROULETTE.CANCEL'),
                }).then((result) => {
                  if (result.isConfirmed && this.selectedMichi) {
                    this.addToAdoptionList(this.selectedMichi);
                  }
                });
              }
            },
            error: () => {
              Swal.fire({
                title: this.translate.instant('ROULETTE.ERROR'),
                text: this.translate.instant('ROULETTE.FETCH_ERROR'),
                icon: 'error',
                confirmButtonColor: '#C99D7D'
              });
            }
          });
        }
      }
    }, interval);
  }

  addToAdoptionList(michi: Michi): void {
    this.michisService.getAdoptionListByUserId(this.currentUserId).subscribe({
      next: (adoptionList) => {
        const alreadyInList = adoptionList.some((adoptedMichi) => adoptedMichi.id === michi.id);

        if (alreadyInList) {
          Swal.fire({
            title: this.translate.instant('ROULETTE.ERROR'),
            text: this.translate.instant('ROULETTE.ALREADY_IN_LIST_ERROR', { name: michi.name }),
            icon: 'error',
            confirmButtonColor: '#C99D7D'
          });
        } else {
          this.michisService.addMichiToAdoptionList(this.currentUserId, michi.id!).subscribe({
            next: () => {
              Swal.fire({
                title: this.translate.instant('ROULETTE.SUCCESS'),
                text: this.translate.instant('ROULETTE.ADD_SUCCESS', { name: michi.name }),
                icon: 'success',
                confirmButtonColor: '#C99D7D',
                timer: 3000,
                timerProgressBar: true
              });
            },
            error: () => {
              Swal.fire({
                title: this.translate.instant('ROULETTE.ERROR'),
                text: this.translate.instant('ROULETTE.ADD_ERROR'),
                icon: 'error',
                confirmButtonColor: '#C99D7D'
              });
            }
          });
        }
      },
      error: () => {
        Swal.fire({
          title: this.translate.instant('ROULETTE.ERROR'),
          text: this.translate.instant('ROULETTE.FETCH_ERROR'),
          icon: 'error',
          confirmButtonColor: '#C99D7D'
        });
      }
    });
  }
}