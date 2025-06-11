import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookingsService } from '../../services/bookings.service';
import { MichisService } from '../../services/michis.service';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { Michi } from '../../model/michis';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { Categories } from '../../model/category';
import { Products } from '../../model/products';

@Component({
  selector: 'app-gestion',
  imports: [NgIf, NgFor, TranslateModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit {
  activeTab: string = 'reservas'; // Tab activa: 'reservas', 'usuarios', 'michis'
  reservations: any[] = [];
  users: any[] = [];
  michis: any[] = [];
  adoptionList: Michi[] = []; // Lista de adopciones
  products: Products[] = [];
  categories: Categories[] = [];
  isAdmin = false;
  userData: any = {}; // Datos del usuario autenticado

  constructor(
    private bookingsService: BookingsService,
    private michisService: MichisService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdmin = this.authService.isAdmin();

    // Obtener los datos del usuario autenticado
    this.authService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;

        // Cargar datos según el rol del usuario
        if (this.isAdmin) {
          this.loadReservations(); // Cargar todas las reservas
          this.loadUsers(); // Cargar todos los usuarios
          this.loadMichis(); // Cargar todos los michis
          this.loadProducts();
          this.loadCategories();
        } else {
          this.loadUserReservations(); // Cargar solo las reservas del usuario
          this.loadAdoptionList(); // Cargar lista de adopciones
        }
      },
      error: (err) => {
        console.error('Error al obtener los datos del usuario:', err);
        Swal.fire('Error', 'No se pudieron cargar los datos del usuario.', 'error');
      }
    });
  }

  // Cambiar la pestaña activa
  setActiveTab(tab: string): void {
    this.activeTab = tab;

    if (this.isAdmin) {
      if (tab === 'reservas') {
        this.loadReservations();
      } else if (tab === 'usuarios') {
        this.loadUsers();
      } else if (tab === 'michis') {
        this.loadMichis();
      }
    } else {
      if (tab === 'reservas') {
        this.loadUserReservations();
      } else if (tab === 'michis') {
        this.loadAdoptionList();
      }
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

  // Cargar reservas del usuario autenticado
  loadUserReservations(): void {
    this.bookingsService.getBookingsByUserId(this.userData.id).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => {
        console.error('Error al cargar las reservas del usuario:', err);
        Swal.fire('Error', 'No se pudieron cargar tus reservas.', 'error');
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

  // Cargar productos
  loadProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Productos cargados:', this.products); // Verifica los IDs de las categorías en los productos

      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
        Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
      }
    });
  }

  // Cargar categorías
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categorías cargadas:', this.categories); // Verifica que las categorías se cargan correctamente

      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
        Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
      }
    });
  }

  addProduct(): void {
    Swal.fire({
      title: 'Agregar Producto',
      html: `
      <input id="name" class="swal2-input" placeholder="Nombre">
      <input id="price" type="number" class="swal2-input" placeholder="Precio">
      <select id="category" class="swal2-select">
        ${this.categories
          .map((category) => `<option value="${category.id}">${category.name}</option>`)
          .join('')}
      </select>
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
        const categoryId = parseInt((document.getElementById('category') as HTMLSelectElement).value, 10);

        if (!name || isNaN(price) || isNaN(categoryId)) {
          Swal.showValidationMessage('Por favor, completa todos los campos correctamente.');
          return null;
        }

        return { name, price, category: { id: categoryId } }; // Enviar el objeto `category` con el `id`
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.productsService.addProduct(result.value).subscribe({
          next: () => {
            Swal.fire('¡Éxito!', 'Producto agregado correctamente.', 'success');
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error al agregar el producto:', err);
            Swal.fire('Error', 'No se pudo agregar el producto.', 'error');
          }
        });
      }
    });
  }

  addUser(): void {
    Swal.fire({
      title: 'Agregar Usuario',
      html: `
      <input id="name" class="swal2-input" placeholder="Nombre">
      <input id="surname" class="swal2-input" placeholder="Apellidos">
      <input id="email" class="swal2-input" placeholder="Correo Electrónico">
      <input id="phoneNumber" class="swal2-input" placeholder="Teléfono">
      <select id="role" class="swal2-select">
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const surname = (document.getElementById('surname') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phoneNumber = parseInt((document.getElementById('phoneNumber') as HTMLInputElement).value, 10);
        const role = (document.getElementById('role') as HTMLSelectElement).value;

        if (!name || !surname || !email || isNaN(phoneNumber) || !role) {
          Swal.showValidationMessage('Por favor, completa todos los campos correctamente.');
          return null;
        }

        return { name, surname, email, phoneNumber, role };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.usersService.addUser(result.value).subscribe({
          next: () => {
            Swal.fire('¡Éxito!', 'Usuario agregado correctamente.', 'success');
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al agregar el usuario:', err);
            Swal.fire('Error', 'No se pudo agregar el usuario.', 'error');
          }
        });
      }
    });
  }

  addMichi(): void {
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
            this.loadMichis();
          },
          error: () => {
            Swal.fire('Error', 'Ocurrió un error al añadir el michi.', 'error');
          }
        });
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

  // Adoptar un nuevo michi
  adoptMichi(): void {
    Swal.fire({
      title: '¡Nos alegra que quieras adoptar un michi!',
      text: 'Nos pondremos en contacto contigo lo antes posible para coordinar la adopción. ¡Muchas gracias por tu interés!',
      icon: 'success',
      confirmButtonText: 'Entendido'
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

  // Cargar lista de adopción del usuario
  loadAdoptionList(): void {
    this.authService.getUserData().subscribe({
      next: (userData) => {
        if (userData && userData.id) {
          this.userData = userData;
          this.michisService.getAdoptionListByUserId(userData.id).subscribe({
            next: (list: Michi[]) => {
              this.adoptionList = list;
            },
            error: (err) => {
              console.error('Error al cargar la lista de adopción:', err);
              Swal.fire('Error', 'No se pudo cargar tu lista de adopción.', 'error');
            }
          });
        } else {
          console.warn('No se pudo obtener el ID del usuario.');
          Swal.fire('Error', 'No se pudo cargar tu lista de adopción (usuario inválido).', 'error');
        }
      },
      error: (err) => {
        console.error('Error al obtener los datos del usuario:', err);
        Swal.fire('Error', 'No se pudieron cargar los datos del usuario.', 'error');
      }
    });
  }

  // Eliminar un michi de la lista de adopción
  removeMichiFromAdoptionList(michiId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al michi de tu lista de adopción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.michisService.deleteMichiFromAdoptionList(this.userData.id, michiId).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El michi ha sido eliminado de tu lista de adopción.', 'success');
            this.loadAdoptionList(); // Recargar la lista de adopción después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar el michi de la lista de adopción:', err);
            Swal.fire('Error', 'No se pudo eliminar el michi de tu lista de adopción.', 'error');
          }
        });
      }
    });
  }

  // Editar producto
  editProduct(id: number): void {
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        Swal.fire({
          title: 'Editar Producto',
          showCancelButton: true,
          html: `
          <input id="name" class="swal2-input" placeholder="Nombre" value="${product.name}">
          <input id="price" class="swal2-input" placeholder="Precio" value="${product.price}">
          <select id="categoryId" class="swal2-select">
            ${this.categories
              .map(
                (category) =>
                  `<option value="${category.id}" ${category.id === product.category.id ? 'selected' : ''
                  }>${category.name}</option>`
              )
              .join('')}
          </select>
        `,
          focusConfirm: false,
          preConfirm: () => {
            const name = (document.getElementById('name') as HTMLInputElement).value;
            const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
            const categoryId = parseInt((document.getElementById('categoryId') as HTMLSelectElement).value, 10);
            const category = this.categories.find((c) => c.id === categoryId); // Obtener el objeto completo de la categoría

            if (!name || isNaN(price) || !category) {
              Swal.showValidationMessage('Por favor, completa todos los campos correctamente.');
              return null;
            }

            return { ...product, name, price, category }; // Incluir el objeto completo de la categoría
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const updatedProduct = result.value;
            this.productsService.updateProduct(updatedProduct).subscribe({
              next: () => {
                Swal.fire('¡Éxito!', 'El producto ha sido actualizado correctamente.', 'success');
                this.loadProducts(); // Recargar productos después de actualizar
              },
              error: (err) => {
                console.error('Error al actualizar el producto:', err);
                Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
        Swal.fire('Error', 'No se pudo obtener el producto.', 'error');
      }
    });
  }

  // Eliminar producto
  deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto de la base de datos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado correctamente.', 'success');
            this.loadProducts(); // Recargar productos después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar el producto:', err);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }


}