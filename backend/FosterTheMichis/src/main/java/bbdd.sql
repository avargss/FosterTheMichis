DROP DATABASE IF EXISTS `FosterTheMichis`;
CREATE DATABASE `FosterTheMichis`;
USE `FosterTheMichis`;

CREATE TABLE `user`
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
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `user`
VALUES (607779357, 1, 'admin@ftm.com', 'admin', 'var12garZ190', '', 'admin'),
       (12345678, 2, 'user@ftm.com', 'user', 'Hola1234', '', 'user');

CREATE TABLE `michi`
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
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `michi`
VALUES (_binary '\0', 11, 1, 'European', 'Just a little boy', 'Zipi', 'example'),
       (_binary '\0', 7, 2, 'Gray', 'Just a little demon', 'Dany', 'example'),
       (_binary '\0', 9, 3, 'Smol', 'Just a little void', 'Fay', 'example'),
       (_binary '', 4, 4, 'Orange', 'Alocao', 'Eustaquio', 'example');

CREATE TABLE `category`
(
    `id`   bigint NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `category`
VALUES (1, 'Bebidas calientes'),
       (2, 'Bebidas frias'),
       (3, 'Postres'),
       (4, 'Caseros'),
       (5, 'Aperitivos felinos');

CREATE TABLE `product`
(
    `price`       double       DEFAULT NULL,
    `id_category` bigint NOT NULL,
    `id_products` bigint NOT NULL AUTO_INCREMENT,
    `name`        varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id_products`),
    KEY `FKip7b0y8ja7fsm5wl7mhmseh5n` (`id_category`),
    CONSTRAINT `FKip7b0y8ja7fsm5wl7mhmseh5n` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 46
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `product`
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

CREATE TABLE `bookings`
(
    `people_number` int         NOT NULL,
    `date`          datetime(6) NOT NULL,
    `id_bookings`   bigint      NOT NULL AUTO_INCREMENT,
    `id_user`       bigint      NOT NULL,
    `comments`      text        NOT NULL,
    PRIMARY KEY (`id_bookings`),
    KEY `FK7n19id7tbioal42r2i75bg4fx` (`id_user`),
    CONSTRAINT `FK7n19id7tbioal42r2i75bg4fx` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_users`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `michi_user`
(
    `id_michis` bigint NOT NULL,
    `id_users`  bigint NOT NULL,
    PRIMARY KEY (`id_michis`, `id_users`),
    KEY `FK4p23fuq917t6ym572v17k616s` (`id_users`),
    CONSTRAINT `FK4p23fuq917t6ym572v17k616s` FOREIGN KEY (`id_users`) REFERENCES `user` (`id_users`),
    CONSTRAINT `FKbdgm8uo8jrtqgu2civtsmkheq` FOREIGN KEY (`id_michis`) REFERENCES `michi` (`id_michis`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;