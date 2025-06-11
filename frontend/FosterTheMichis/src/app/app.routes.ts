import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { AdopcionComponent } from './components/adopcion/adopcion.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { RegisterComponent } from './components/register/register.component';
import { GestionComponent } from './shared/gestion/gestion.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'menu', component: MenuComponent, title: 'Menú' },
    { path: 'galeria', component: GaleriaComponent, title: 'Galería' },
    { path: 'adopcion', component: AdopcionComponent, title: 'Adopción' },
    { path: 'contacto', component: ContactoComponent, title: 'Contacto' },
    { path: 'reservas', component: ReservasComponent, title: 'Reservas' },
    { path: 'gestion', component: GestionComponent, title: 'Gestión' },
    { path: 'ruleta', component: RuletaComponent, title: 'Ruleta' }

];