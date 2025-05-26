import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  
  onSubmit(form: any): void {
    if (form.valid) {
      Swal.fire({
        title: '¡Purrrfecto!',
        text: 'Nos pondremos en contacto contigo lo antes posible.',
        icon: 'success',
        confirmButtonText: '¡Genial!'
      });
      form.resetForm();
    } else if (form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, rellena todos los campos.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }
}