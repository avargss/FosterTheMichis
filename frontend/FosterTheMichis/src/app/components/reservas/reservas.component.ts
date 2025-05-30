import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  imports: [FormsModule, RouterLink],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  userData: any = {};
  isAuthenticated: boolean = false; // Indica si el usuario está autenticado

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); // Verifica si el usuario está autenticado

    const userDataObservable = this.authService.getUserData();
    if (userDataObservable) {
      userDataObservable.subscribe({
        next: (data) => {
          this.userData = data; // Rellena los datos del usuario
        },
        error: (err) => {
          console.error('Error al obtener los datos del usuario:', err);
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar los datos del usuario. Por favor, inicia sesión nuevamente.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      });
    } else {
      console.warn('No se pudieron obtener los datos del usuario. Asegúrate de que el usuario haya iniciado sesión.');
    }
  }

  onSubmit(form: any): void {
    if (form.valid) {
      Swal.fire({
        title: '¡Reserva confirmada!',
        text: 'Tu reserva ha sido registrada con éxito. ¡Te esperamos pronto!',
        icon: 'success',
        confirmButtonText: '¡Genial!'
      });
      form.resetForm();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente antes de hacer una reserva.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }
}