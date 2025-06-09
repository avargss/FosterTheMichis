# FosterTheMichis

FosterTheMichis es una aplicación web full-stack para la gestión de un Cat Café, permitiendo reservas, adopciones de gatos ("michis"), gestión de usuarios y administración de productos del menú. El proyecto está dividido en dos partes principales: un frontend Angular y un backend Java Spring Boot.

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Scripts Útiles](#scripts-útiles)
- [Testing](#testing)
- [Internacionalización](#internacionalización)
- [Licencia](#licencia)

---

## Características

- Registro y autenticación de usuarios (JWT)
- Gestión de reservas para el Cat Café
- Listado y adopción de gatos (michis)
- Panel de administración para usuarios, reservas, michis y productos
- Menú de productos categorizados
- Internacionalización (español/inglés)
- Responsive design

---

## Tecnologías

- **Frontend:** Angular 16+, Bootstrap, SweetAlert2, ngx-translate
- **Backend:** Spring Boot, Spring Security (JWT), JPA/Hibernate, Lombok
- **Base de datos:** MySQL/MariaDB (o compatible)
- **Otros:** Docker (opcional), REST API

---

## Estructura del Proyecto

```
FosterTheMichis/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Componentes principales (menu, galeria, adopcion, reservas, etc.)
│   │   │   ├── shared/             # Componentes compartidos (header, footer, gestion)
│   │   │   ├── model/              # Modelos TypeScript (Michi, Bookings, etc.)
│   │   │   ├── services/           # Servicios Angular para consumir la API
│   │   ├── assets/                 # Imágenes, iconos, traducciones
│   │   ├── environment/            # Configuración de entornos
│   │   ├── index.html, main.ts, styles.css
│   ├── angular.json, package.json, tsconfig.json, etc.
│
├── backend/
│   ├── src/main/java/com/ftm/
│   │   ├── controller/             # Controladores REST (Users, Michis, Bookings, Products, Categories)
│   │   ├── domain/                 # Entidades JPA (User, Michi, Bookings, Product, Category)
│   │   ├── repository/             # Repositorios Spring Data JPA
│   │   ├── service/                # Lógica de negocio
│   │   ├── config/                 # Seguridad, CORS, JWT
│   │   └── FosterTheMichisApplication.java
│   ├── resources/                  # application.properties, data.sql, etc.
│
└── README.md
```

---

## Estructura de la Base de Datos

### Tablas principales y relaciones

#### Users

| Campo         | Tipo           | Descripción                |
|---------------|----------------|----------------------------|
| id_users      | BIGINT (PK)    | ID único                   |
| name          | VARCHAR        | Nombre                     |
| surname       | VARCHAR        | Apellidos                  |
| phone_number  | INT            | Teléfono                   |
| email         | VARCHAR        | Email (único)              |
| password      | VARCHAR        | Contraseña (hash)          |
| role          | ENUM           | 'admin' o 'user'           |

#### Michis

| Campo         | Tipo           | Descripción                |
|---------------|----------------|----------------------------|
| id_michis     | BIGINT (PK)    | ID único                   |
| name          | VARCHAR        | Nombre del michi           |
| age           | INT            | Edad                       |
| photo         | VARCHAR        | URL de la foto             |
| breed         | VARCHAR        | Raza                       |
| description   | VARCHAR/TEXT   | Descripción                |
| adoptable     | BOOLEAN        | ¿Está disponible para adopción? |

#### Bookings

| Campo         | Tipo           | Descripción                |
|---------------|----------------|----------------------------|
| id_bookings   | BIGINT (PK)    | ID único                   |
| date          | DATETIME       | Fecha y hora de la reserva |
| people_number | INT            | Número de personas         |
| comments      | TEXT           | Comentarios                |
| id_user       | BIGINT (FK)    | Usuario que reserva        |

#### Products

| Campo         | Tipo           | Descripción                |
|---------------|----------------|----------------------------|
| id_products   | BIGINT (PK)    | ID único                   |
| name          | VARCHAR        | Nombre del producto        |
| price         | DOUBLE         | Precio                     |
| id_category   | BIGINT (FK)    | Categoría                  |

#### Categories

| Campo         | Tipo           | Descripción                |
|---------------|----------------|----------------------------|
| id            | BIGINT (PK)    | ID único                   |
| name          | VARCHAR        | Nombre de la categoría     |

#### Michi_user (tabla intermedia ManyToMany)

| Campo         | Tipo           | Descripción                |
|---------------|----------------|----------------------------|
| id_michis     | BIGINT (FK)    | Referencia a michis        |
| id_users      | BIGINT (FK)    | Referencia a users         |

---

## Instalación y Ejecución

### Requisitos

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Java 17+
- Maven o Gradle
- MySQL/MariaDB

### Frontend

```bash
cd frontend
npm install
ng serve
```
Accede a [http://localhost:4200](http://localhost:4200)

### Backend

Configura tu `application.properties` con los datos de tu base de datos.

```bash
cd backend
./mvnw spring-boot:run
```
El backend estará en [http://localhost:8080](http://localhost:8080)

---

## Scripts Útiles

- **Frontend**
  - `ng serve` — Servidor de desarrollo
  - `ng build` — Compilar para producción
  - `ng test` — Ejecutar tests unitarios

- **Backend**
  - `./mvnw spring-boot:run` — Ejecutar backend
  - `./mvnw test` — Ejecutar tests backend

---

## Testing

- **Frontend:** Usa Karma/Jasmine (`ng test`)
- **Backend:** Usa JUnit (integrado en Spring Boot)

---

## Internacionalización

El frontend soporta español e inglés usando [ngx-translate](https://github.com/ngx-translate/core). Los archivos de traducción están en `frontend/src/assets/i18n/`.

---

## Licencia

MIT © FosterTheMichis

---