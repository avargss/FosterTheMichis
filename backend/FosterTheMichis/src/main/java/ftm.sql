DROP DATABASE IF EXISTS `FosterTheMichis`;
CREATE DATABASE `FosterTheMichis`;
USE `FosterTheMichis`;

-- USERS TABLE

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    `phone_number` int                   DEFAULT NULL,
    `id_users`     bigint NOT NULL AUTO_INCREMENT,
    `email`        varchar(255)          DEFAULT NULL,
    `name`         varchar(255)          DEFAULT NULL,
    `password`     varchar(255)          DEFAULT NULL,
    `surname`      varchar(255)          DEFAULT NULL,
    `role`         enum ('admin','user') DEFAULT NULL,
    PRIMARY KEY (`id_users`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 22
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;

INSERT INTO `users`
VALUES (123987456, 18, 'vero@ftm.com', 'Veronika', '$2a$10$LdE7UcyMrL2wfMd1uQhxSu/3DZYJ4E9/Tftq0UBWsY3H7sUkgdnKG',
        'Tryhubyak', 'user'),
       (111111111, 19, 'admin1prueba@ftm.com', 'admin', '$2a$10$MuNkAmdNZCTKufGOS8fdxe2rMaxCMxJjBNDngODAyNlgHFHZzTHlK',
        '', 'admin'),
       (684388781, 20, 'ariana@ftm.com', 'Ariana', '$2a$10$tRh2ttXRZud1Cby3nYn0LOsJhKlLgtS0w0SrbEXxCIUs5cr80iCF2',
        'Martín', 'user');
UNLOCK TABLES;

-- MICHIS TABLE

DROP TABLE IF EXISTS `michis`;
CREATE TABLE `michis`
(
    `adoptable`   bit(1) NOT NULL,
    `age`         int    NOT NULL,
    `id_michis`   bigint NOT NULL AUTO_INCREMENT,
    `breed`       varchar(255) DEFAULT NULL,
    `description` varchar(255) DEFAULT NULL,
    `name`        varchar(255) DEFAULT NULL,
    `photo`       varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id_michis`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 22
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK
    TABLES `michis` WRITE;
INSERT INTO `michis`
VALUES (_binary '\0', 11, 1, 'Fatass', 'Just a little boy', 'Zipi',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747394133/Zipi4_vjpt5x.jpg'),
       (_binary '\0', 7, 2, 'Demoniaca', 'Just a little demon', 'Dany',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747397048/Dany_b5glsm.jpg'),
       (_binary '\0', 8, 3, 'Smol', 'Un pequeño agujero negro que absorve todas las lonchas de pavo que huele', 'Fay',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747394260/Fay4_quazz4.jpg'),
       (_binary '', 4, 4, 'Europeo de pelo corto', 'Alocao', 'Eustaquio',
        'https://preview.redd.it/v0xhq8kxzjrd1.jpeg?width=640&crop=smart&auto=webp&s=1a66eac83f4d32dcc96bbd30b1ff158890db4810'),
       (_binary '', 4, 6, 'Europeo de pelo corto', 'Alocado y lleno de energía', 'Leonardo',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747391807/Screenshot-2024-12-06-at-10.01.02_E2_80_AFPM_p3subd.png'),
       (_binary '', 2, 7, 'Siamés', 'Cariñosa y muy juguetona', 'Mía',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747391409/gato-siames-caracter-historia_xhw1ig.jpg'),
       (_binary '', 3, 8, 'Maine Coon', 'Tranquilo y sociable', 'Simba',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392045/neroigMesa-de-trabajo-1-50_htg3de.jpg'),
       (_binary '', 1, 9, 'Europeo común', 'Curiosa y llena de vida', 'Luna',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392387/black-cat-min-e1680636929915_jh1wlk.jpg'),
       (_binary '', 5, 10, 'Persa', 'Le encanta dormir todo el día', 'Tomás',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392464/gatos-persas_uakjjw.jpg'),
       (_binary '', 2, 11, 'Calicó', 'Muy dulce y tierna', 'Nina',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392583/6393714e2ee61.r_d.960-640-6250_thuutl.jpg'),
       (_binary '', 3, 12, 'Azul Ruso', 'Elegante y algo reservado', 'Max',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392706/161381553_l_n5rc6z.jpg'),
       (_binary '', 4, 13, 'Bengala', 'Energética y muy curiosa', 'Olivia',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392790/el-gato-bengali-un-tiene-su-lado-jugueton-y-es-un-gran-amante-de-la-diversion_abww71.jpg'),
       (_binary '', 6, 14, 'Siberiano', 'Amigable y peludo', 'Felipe',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392837/mg_7718-modifier-1-1024x683_eq5uwh.jpg'),
       (_binary '', 2, 15, 'Abisinio', 'Inteligente y juguetona', 'Cleo',
        'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1747392952/abisinio-1_igac8k.jpg'),
       (_binary '', 2, 16, 'Europeo común', 'Lentita pero mimosa', 'DouDou',
        'https://i.pinimg.com/736x/d7/87/05/d787057242b451806157f82a9ccd285e.jpg'),
       (_binary '', 3, 19, 'Europeo común', 'Gato', 'Queso',
        'https://estaticos-cdn.prensaiberica.es/clip/4aa0daef-e0d4-4ffd-b233-adf99148177e_16-9-discover-aspect-ratio_640w_0.jpg'),
       (_binary '', 3, 20, 'Europeo común', 'Gordo y vago', 'Leo',
        'https://res.cloudinary.com/dr5rih8sj/image/upload/v1749141948/9c689c3d-a9b9-46f3-8c6e-40a48007e9a0_klvn79.jpg'),
       (_binary '', 4, 21, 'Europeo común', 'Gritona y te juzga con la mirada', 'Misi',
        'https://res.cloudinary.com/dr5rih8sj/image/upload/v1749142342/19735514-63ec-4291-8294-829e98704be0_bwrxlu.jpg');
UNLOCK
    TABLES;

-- CATEGORIES TABLE

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`
(
    `id`   bigint NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK
    TABLES `categories` WRITE;
INSERT INTO `categories`
VALUES (1, 'Bebidas calientes'),
       (2, 'Bebidas frias'),
       (3, 'Postres'),
       (4, 'Caseros'),
       (5, 'Aperitivos felinos');
UNLOCK
    TABLES;

-- PRODUCTS TABLE

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`
(
    `price`       double       DEFAULT NULL,
    `id_category` bigint NOT NULL,
    `id_products` bigint NOT NULL AUTO_INCREMENT,
    `name`        varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id_products`),
    KEY `FKip7b0y8ja7fsm5wl7mhmseh5n` (`id_category`),
    CONSTRAINT `FKip7b0y8ja7fsm5wl7mhmseh5n` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 46
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK
    TABLES `products` WRITE;
INSERT INTO `products`
VALUES (2.5, 1, 1, 'Té Verde'),
       (2, 1, 2, 'Té de Manzanilla'),
       (2.75, 1, 3, 'Té de Frutas Rojas'),
       (3, 1, 4, 'Café con leche'),
       (3, 1, 5, 'Café Americano'),
       (4, 1, 6, 'Café Mocha'),
       (3.25, 1, 7, 'Chocolate Caliente'),
       (2.75, 1, 8, 'Leche Caliente con Miel'),
       (2.75, 1, 9, 'Colacao'),
       (2.75, 1, 10, 'Manzanilla'),
       (2, 2, 11, 'Limonada'),
       (2.5, 2, 12, 'Té Helado de Durazno'),
       (2.5, 2, 13, 'Té Helado de Limón'),
       (1.75, 2, 14, 'Agua de Jamaica'),
       (1.75, 2, 15, 'Agua de Tamarindo'),
       (3.5, 2, 16, 'Smoothie de Fresa'),
       (3.5, 2, 17, 'Smoothie de Mango'),
       (4, 2, 18, 'Café Frappé'),
       (2.25, 2, 19, 'Leche Fría con Chocolate'),
       (1.5, 2, 20, 'Agua Mineral con Sabor a Fresa'),
       (4.5, 3, 21, 'Pastel de Chocolate'),
       (5, 3, 22, 'Tarta de queso'),
       (3.75, 3, 23, 'Brownie'),
       (4.25, 3, 24, 'Tarta de Manzana'),
       (2.5, 3, 25, 'Helado de Vainilla'),
       (2.5, 3, 26, 'Helado de Chocolate'),
       (1.75, 3, 27, 'Galletas de Chispas de Chocolate'),
       (2, 3, 28, 'Cupcake de Vainilla'),
       (1.5, 3, 29, 'Gelatina de Fresa'),
       (1.25, 3, 30, 'Paleta de Frutas Congeladas'),
       (2.5, 4, 31, 'Gofre de Chocolate'),
       (3.2, 4, 32, 'Tortita Americana con Miel'),
       (3.5, 4, 33, 'Pancake de Arándanos'),
       (3.8, 4, 34, 'Gofre Belga con Fresas'),
       (3, 4, 35, 'Tortitas de Avena y Plátano'),
       (3.6, 4, 36, 'Pancake de Nutella'),
       (3.9, 4, 37, 'Gofre Relleno de Crema'),
       (3.4, 4, 38, 'Tortita de Manzana y Canela'),
       (3.7, 4, 39, 'Pancake Vegano con Sirope de Agave'),
       (3.3, 4, 40, 'Gofre Crujiente de Coco'),
       (1.9, 5, 41, 'Snacks de Salmón para Gato'),
       (4.2, 5, 42, 'Croquetas Premium de Pollo'),
       (2.3, 5, 43, 'Bocaditos de Atún'),
       (1.8, 5, 44, 'Barritas de Pavo para Gatos'),
       (2.1, 5, 45, 'Galletitas Crujientes de Queso');
UNLOCK
    TABLES;

-- BOOKINGS TABLE

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings`
(
    `people_number` int         NOT NULL,
    `date`          datetime(6) NOT NULL,
    `id_bookings`   bigint      NOT NULL AUTO_INCREMENT,
    `id_user`       bigint      NOT NULL,
    `comments`      text        NOT NULL,
    PRIMARY KEY (`id_bookings`),
    KEY `FK7n19id7tbioal42r2i75bg4fx` (`id_user`),
    CONSTRAINT `FK7n19id7tbioal42r2i75bg4fx` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 19
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK
    TABLES `bookings` WRITE;
INSERT INTO `bookings`
VALUES (4, '2025-06-06 11:40:00.000000', 18, 20, 'Reserva de prueba');
UNLOCK
    TABLES;

-- MICHIS_USER TABLE

DROP TABLE IF EXISTS `michi_user`;
CREATE TABLE `michi_user`
(
    `id_michis` bigint NOT NULL,
    `id_users`  bigint NOT NULL,
    PRIMARY KEY (`id_michis`, `id_users`),
    KEY `FK4p23fuq917t6ym572v17k616s` (`id_users`),
    CONSTRAINT `FK4p23fuq917t6ym572v17k616s` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`),
    CONSTRAINT `FKbdgm8uo8jrtqgu2civtsmkheq` FOREIGN KEY (`id_michis`) REFERENCES `michis` (`id_michis`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK
    TABLES `michi_user` WRITE;
INSERT INTO `michi_user`
VALUES (4, 20),
       (6, 20),
       (7, 20);
UNLOCK
    TABLES;