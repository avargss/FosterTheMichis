import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hasLoaded: boolean = true;

  error = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {

    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Bienvenido',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      });
      // Aquí podrías navegar o llamar a un servicio de autenticación
    } else if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Revisa los campos marcados.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      // Marcar todos como touched para mostrar errores
      this.loginForm.markAllAsTouched();

      return;
    }

    this.hasLoaded = false;
    this.authService.login(this.loginForm.value).subscribe({
      next: (rtn) => {
        /* console.log(rtn); */

        const validToken = this.tokenService.handle(rtn.token);

        /* console.log(validToken); */

        if (validToken) {
          this.authService.changeAuthStatus(true);

          console.log("Login ok");

          /* this.authService.me({token: rtn.token}).subscribe({
            next: (rtn) => {
              
              this.router.navigateByUrl('/');
            },
            error: (error) => {
              console.error(error);
            },
          }); */
        }
      },
      error: (error) => {
        console.error(error);
        this.hasLoaded = true;
        this.handleError(error);
      },
    });
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}