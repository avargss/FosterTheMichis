import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      role: ['user', Validators.required] // Asegúrate de que el valor sea válido
    });

    /* // Verifica si el usuario actual es administrador
    this.isAdmin = this.authService.isAdmin(); */
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Usuario registrado',
            text: 'El usuario ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Continuar'
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 400) {
            Swal.fire({
              title: 'Error de validación',
              text: 'Por favor, revisa los datos ingresados.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          } else if (err.status === 409) {
            Swal.fire({
              title: 'Error',
              text: 'El email ya está registrado.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al registrar el usuario.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
          console.error(err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}