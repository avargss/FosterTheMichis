import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-reservas',
  imports: [FormsModule, RouterLink],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  reservationForm!: FormGroup;
  userData: any = {};
  isAuthenticated: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('Usuario autenticado:', this.isAuthenticated);

    const userDataObservable = this.authService.getUserData();
    if (userDataObservable) {
      userDataObservable.subscribe({
        next: (data) => {
          this.userData = data;
          console.log('Datos del usuario:', this.userData);
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
    console.log('Formulario enviado:', form.value);

    this.reservationForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      comments: [''],
      phone: [{ value: this.userData?.phoneNumber || '', disabled: true }],
      email: [{ value: this.userData?.email || '', disabled: true }],
      firstName: [{ value: this.userData?.name || '', disabled: true }],
      lastName: [{ value: this.userData?.surname || '', disabled: true }]
    });

    if (form.valid) {
      if (!this.userData || !this.userData.id) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        return;
      }

      // Construir el objeto de reserva
      const reservationData = {
        date: `${form.value.date}T${form.value.time}:00`, // Combina fecha y hora en formato ISO
        peopleNumber: form.value.guests,
        comments: form.value.comments || null, // Si no hay comentarios, enviar null
        user: {
          id: this.userData.id // ID del usuario autenticado
        }
      };

      // Enviar los datos al backend
      this.bookingsService.addBooking(reservationData).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Reserva confirmada!',
            text: 'Tu reserva ha sido registrada con éxito. ¡Te esperamos pronto!',
            icon: 'success',
            confirmButtonText: '¡Genial!'
          });
          form.resetForm(); // Reiniciar el formulario
        },
        error: (err) => {
          console.error('Error al crear la reserva:', err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar tu reserva. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      });
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