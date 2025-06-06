import { Component } from '@angular/core';
import { Michi } from '../../model/michis';
import { MichisService } from '../../services/michis.service';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-adopcion',
  imports: [NgFor, NgIf, TranslateModule],
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.css'

})
export class AdopcionComponent {
  nonAdoptableMichis: Michi[] = [];
  adoptableMichis: Michi[] = [];
  isAdmin = false;
  isLoggedIn = false;
  adoptionList: Michi[] = [];
  currentUserId!: number;

  constructor(private michisService: MichisService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // 1) Cargamos el usuario actual (para saber su ID)
    this.authService.getUserData().subscribe({
      next: user => {
        if (user && user.id) {
          this.currentUserId = user.id;
        }
      },
      error: () => {
        console.warn('No se pudo obtener el usuario autenticado al inicializar AdopcionComponent.');
      }
    });

    // 2) Cargamos listas de michis
    this.loadNonAdoptableMichis();
    this.loadAdoptableMichis();

    // 3) Estado de sesión/rol
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();

    console.log(`Usuario autenticado: ${this.isLoggedIn}, Rol de administrador: ${this.isAdmin}`);

  }

  openAddMichiForm(): void {
    Swal.fire({
      title: 'Añadir nuevo Michi',
      icon: 'question',
      showCloseButton: true,
      html: `
      <input id="swal-input-name" class="swal2-input" placeholder="Nombre" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
      <input id="swal-input-age" type="number" class="swal2-input" placeholder="Edad" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
      <input id="swal-input-breed" class="swal2-input" placeholder="Raza" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
      <textarea id="swal-input-description" class="swal2-textarea" placeholder="Descripción" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;"></textarea>
      <input id="swal-input-photo" class="swal2-input" placeholder="URL de la foto" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
      <label for="swal-input-adoptable" style="display: block; margin-bottom: 5px; font-weight: bold;">¿Es adoptable?</label>
      <select id="swal-input-adoptable" class="swal2-select" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>

    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('swal-input-name') as HTMLInputElement).value.trim();
        const age = parseInt((document.getElementById('swal-input-age') as HTMLInputElement).value, 10);
        const breed = (document.getElementById('swal-input-breed') as HTMLInputElement).value.trim();
        const description = (document.getElementById('swal-input-description') as HTMLTextAreaElement).value.trim();
        const photo = (document.getElementById('swal-input-photo') as HTMLInputElement).value.trim();
        const adoptable = (document.getElementById('swal-input-adoptable') as HTMLSelectElement).value === 'true';

        if (!name || isNaN(age) || !breed || !description || !photo) {
          Swal.showValidationMessage('Por favor, completa todos los campos correctamente.');
          return;
        }

        return { name, age, breed, description, photo, adoptable };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newMichi = result.value;
        this.michisService.addMichi(newMichi).subscribe({
          next: () => {
            Swal.fire('¡Éxito!', 'El michi ha sido añadido correctamente.', 'success');
            // Recargar la lista de michis
            this.loadNonAdoptableMichis();
            this.loadAdoptableMichis();
          },
          error: () => {
            Swal.fire('Error', 'Ocurrió un error al añadir el michi.', 'error');
          }
        });
      }
    });
  }

  editMichi(id: number): void {
    this.michisService.getMichiById(id).subscribe((michi) => {
      Swal.fire({
        title: 'Editar Michi',
        icon: 'info',
        showCloseButton: true,
        html: `
            <input id="swal-input-name" class="swal2-input" placeholder="Nombre" value="${michi.name}" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
            <input id="swal-input-age" type="number" class="swal2-input" placeholder="Edad" value="${michi.age}" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
            <input id="swal-input-breed" class="swal2-input" placeholder="Raza" value="${michi.breed}" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
            <textarea id="swal-input-description" class="swal2-textarea" placeholder="Descripción" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">${michi.description}</textarea>
            <input id="swal-input-photo" class="swal2-input" placeholder="URL de la foto" value="${michi.photo}" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
            <label for="swal-input-adoptable" style="display: block; margin-bottom: 5px; font-weight: bold;">¿Es adoptable?</label>
            <select id="swal-input-adoptable" class="swal2-select" style="width: 90%; padding: 10px; font-size: 16px; margin-bottom: 10px;">
              <option value="true" ${michi.adoptable ? 'selected' : ''}>Sí</option>
              <option value="false" ${!michi.adoptable ? 'selected' : ''}>No</option>
            </select>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const name = (document.getElementById('swal-input-name') as HTMLInputElement).value.trim();
          const age = parseInt((document.getElementById('swal-input-age') as HTMLInputElement).value, 10);
          const breed = (document.getElementById('swal-input-breed') as HTMLInputElement).value.trim();
          const description = (document.getElementById('swal-input-description') as HTMLTextAreaElement).value.trim();
          const photo = (document.getElementById('swal-input-photo') as HTMLInputElement).value.trim();
          const adoptable = (document.getElementById('swal-input-adoptable') as HTMLSelectElement).value === 'true';

          if (!name || isNaN(age) || !breed || !description || !photo) {
            Swal.showValidationMessage('Por favor, completa todos los campos correctamente.');
            return;
          }

          return { id, name, age, breed, description, photo, adoptable };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const updatedMichi = result.value;
          this.michisService.updateMichi(updatedMichi).subscribe({
            next: () => {
              Swal.fire('¡Éxito!', 'El michi ha sido actualizado correctamente.', 'success');
              // Recargar las listas de michis
              this.loadNonAdoptableMichis();
              this.loadAdoptableMichis();
            },
            error: () => {
              Swal.fire('Error', 'Ocurrió un error al actualizar el michi.', 'error');
            }
          });
        }
      });
    });
  }

  deleteMichi(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al michi de la base de datos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.michisService.deleteMichi(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El michi ha sido eliminado correctamente.', 'success');
            // Recargar las listas de michis
            this.loadNonAdoptableMichis();
            this.loadAdoptableMichis();
          },
          error: () => {
            Swal.fire('Error', 'Ocurrió un error al eliminar el michi.', 'error');
          }
        });
      }
    });
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

  // Método para cargar las razas desde la base de datos
  /* loadBreeds(): void {
    this.michisService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  } */

  addToAdoptionList(michi: Michi): void {
    // Llamamos al endpoint POST /michis/{michiId}/adopt/{userId}
    this.michisService.addMichiToAdoptionList(this.currentUserId, michi.id!).subscribe({
      next: () => {
        // Actualizamos la lista local para que se refleje en la vista de ‘Gestión’
        this.adoptionList.push(michi);

        Swal.fire({
          title: '¡Michi añadido!',
          text: `${michi.name} se ha añadido a tu lista de adopción.`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ir a Gestión',
          cancelButtonText: 'Entendido'
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigate(['/gestion']);
          }
        });
      },
      error: err => {
        console.error('Error al añadir a lista de adopción:', err);
        Swal.fire('Error', 'No se pudo añadir el michi a tu lista de adopción.', 'error');
      }
    });
  }


  getTotalMichis(): number {
    return this.nonAdoptableMichis.length + this.adoptableMichis.length;
  }

  // Método para verificar si el usuario es administrador
  checkAdminRole(): boolean {
    return this.isAdmin = this.authService.isAdmin();
  }

}