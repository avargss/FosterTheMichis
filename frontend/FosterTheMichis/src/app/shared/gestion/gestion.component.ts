import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookingsService } from '../../services/bookings.service';
import { MichisService } from '../../services/michis.service';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-gestion',
  imports: [NgIf, NgFor],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit {
  activeTab: string = 'reservas'; // Tab activa: 'reservas', 'usuarios', 'michis'
  reservations: any[] = [];
  users: any[] = [];
  michis: any[] = [];

  constructor(
    private bookingsService: BookingsService,
    private michisService: MichisService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.loadReservations(); // Cargar reservas por defecto
  }

  // Cambiar la pestaña activa
  setActiveTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'reservas') {
      this.loadReservations();
    } else if (tab === 'usuarios') {
      this.loadUsers();
    } else if (tab === 'michis') {
      this.loadMichis();
    }
  }

  // Cargar reservas
  loadReservations(): void {
    this.bookingsService.getAllBookings().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => {
        console.error('Error al cargar las reservas:', err);
        Swal.fire('Error', 'No se pudieron cargar las reservas.', 'error');
      }
    });
  }

  // Cargar usuarios
  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
        Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    });
  }

  // Cargar michis
  loadMichis(): void {
    this.michisService.getAllMichis().subscribe({
      next: (michis) => {
        this.michis = michis;
      },
      error: (err) => {
        console.error('Error al cargar los michis:', err);
        Swal.fire('Error', 'No se pudieron cargar los michis.', 'error');
      }
    });
  }

  // Eliminar una reserva
  deleteBooking(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la reserva permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingsService.deleteBooking(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'La reserva ha sido eliminada correctamente.', 'success');
            this.loadReservations(); // Recargar reservas después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar la reserva:', err);
            Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error');
          }
        });
      }
    });
  }

  // Editar una reserva
  editBooking(id: number): void {
    this.bookingsService.getBookingById(id).subscribe({
      next: (booking) => {
        Swal.fire({
          title: 'Editar Reserva',
          showCancelButton: true,
          html: `
          <input id="date" class="swal2-input" placeholder="Fecha" value="${booking.date}">
          <input id="peopleNumber" class="swal2-input" placeholder="Número de Personas" value="${booking.peopleNumber}">
          <textarea id="comments" class="swal2-textarea" placeholder="Comentarios">${booking.comments || ''}</textarea>
        `,
          focusConfirm: false,
          preConfirm: () => {
            const date = (document.getElementById('date') as HTMLInputElement).value;
            const peopleNumber = (document.getElementById('peopleNumber') as HTMLInputElement).value;
            const comments = (document.getElementById('comments') as HTMLTextAreaElement).value;

            return { ...booking, date, peopleNumber, comments };
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const updatedBooking = result.value;
            this.bookingsService.updateBooking(updatedBooking).subscribe({
              next: () => {
                Swal.fire('¡Éxito!', 'La reserva ha sido actualizada correctamente.', 'success');
                this.loadReservations(); // Recargar reservas después de actualizar
              },
              error: (err) => {
                console.error('Error al actualizar la reserva:', err);
                Swal.fire('Error', 'No se pudo actualizar la reserva.', 'error');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener la reserva:', err);
        Swal.fire('Error', 'No se pudo obtener la reserva.', 'error');
      }
    });
  }

  // Eliminar un usuario
  deleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario de la base de datos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado correctamente.', 'success');
            this.loadUsers(); // Recargar usuarios después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar el usuario:', err);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }

  // Editar un usuario
  editUser(id: number): void {
    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        Swal.fire({
          title: 'Editar Usuario',
          showCancelButton: true,
          html: `
          <input id="name" class="swal2-input" placeholder="Nombre" value="${user.name}">
          <input id="surname" class="swal2-input" placeholder="Apellidos" value="${user.surname}">
          <input id="email" class="swal2-input" placeholder="Correo Electrónico" value="${user.email}">
          <input id="phoneNumber" class="swal2-input" placeholder="Teléfono" value="${user.phoneNumber}">
          <select id="role" class="swal2-select">
            <option value="user" ${user.role === 'user' ? 'selected' : ''}>Usuario</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrador</option>
          </select>
        `,
          focusConfirm: false,
          preConfirm: () => {
            const name = (document.getElementById('name') as HTMLInputElement).value;
            const surname = (document.getElementById('surname') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
            const role = (document.getElementById('role') as HTMLSelectElement).value;

            return { ...user, name, surname, email, phoneNumber, role };
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const updatedUser = result.value;
            this.usersService.updateUser(updatedUser).subscribe({
              next: () => {
                Swal.fire('¡Éxito!', 'El usuario ha sido actualizado correctamente.', 'success');
                this.loadUsers(); // Recargar usuarios después de actualizar
              },
              error: (err) => {
                console.error('Error al actualizar el usuario:', err);
                Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        Swal.fire('Error', 'No se pudo obtener el usuario.', 'error');
      }
    });
  }

  // Eliminar un michi
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
            this.loadMichis(); // Recargar michis después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar el michi:', err);
            Swal.fire('Error', 'No se pudo eliminar el michi.', 'error');
          }
        });
      }
    });
  }

  // Editar un michi
  editMichi(id: number): void {
    this.michisService.getMichiById(id).subscribe({
      next: (michi) => {
        Swal.fire({
          title: 'Editar Michi',
          showCancelButton: true,
          html: `
          <input id="name" class="swal2-input" placeholder="Nombre" value="${michi.name}">
          <input id="age" class="swal2-input" placeholder="Edad" value="${michi.age}">
          <input id="breed" class="swal2-input" placeholder="Raza" value="${michi.breed}">
          <select id="adoptable" class="swal2-select">
            <option value="true" ${michi.adoptable ? 'selected' : ''}>Sí</option>
            <option value="false" ${!michi.adoptable ? 'selected' : ''}>No</option>
          </select>
        `,
          focusConfirm: false,
          preConfirm: () => {
            const name = (document.getElementById('name') as HTMLInputElement).value;
            const age = parseInt((document.getElementById('age') as HTMLInputElement).value, 10);
            const breed = (document.getElementById('breed') as HTMLInputElement).value;
            const adoptable = (document.getElementById('adoptable') as HTMLSelectElement).value === 'true';

            return { ...michi, name, age, breed, adoptable };
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const updatedMichi = result.value;
            this.michisService.updateMichi(updatedMichi).subscribe({
              next: () => {
                Swal.fire('¡Éxito!', 'El michi ha sido actualizado correctamente.', 'success');
                this.loadMichis(); // Recargar la lista de michis después de actualizar
              },
              error: (err) => {
                console.error('Error al actualizar el michi:', err);
                Swal.fire('Error', 'No se pudo actualizar el michi.', 'error');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el michi:', err);
        Swal.fire('Error', 'No se pudo obtener el michi.', 'error');
      }
    });
  }


}