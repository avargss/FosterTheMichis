package com.ftm.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
@Builder
// Para que funcione la colección Set<Products> en Categories
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_products")
    private long id;

    private String name;

    private Double price;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_category", referencedColumnName = "id", nullable = false)
    private Category category;

}
