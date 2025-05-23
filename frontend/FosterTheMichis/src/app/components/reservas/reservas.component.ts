import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  imports: [FormsModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  onSubmit(form: any): void {  // Puedes seguir usando NgForm si prefieres, pero 'any' evitará quejarse si no lo reconoce.
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