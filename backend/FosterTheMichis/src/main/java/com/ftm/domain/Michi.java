package com.ftm.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "michis")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Michi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_michis")
    private Long id;

    private String name;

    private int age;

    private String photo;

    private String breed;

    private String description;

    private boolean adoptable;

    /**
     * Relación ManyToMany con la entidad Users.
     * Se define la tabla intermedia "michi_user" y se especifican las columnas
     * que referencian a cada entidad.
     */
    @ManyToMany
    @JoinTable(
            name = "michi_user",
            joinColumns = @JoinColumn(name = "id_michis", referencedColumnName = "id_michis"),
            inverseJoinColumns = @JoinColumn(name = "id_users", referencedColumnName = "id_users")
    )
    private Set<User> users = new HashSet<>();
}
