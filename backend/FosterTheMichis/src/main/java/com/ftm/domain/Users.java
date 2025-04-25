package com.ftm.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
// Para que funcione la colección Set<Users> en Michis
@EqualsAndHashCode(of = "id")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_users")
    private Long id;

    private String name;

    private String surname;

    @Column(name = "phone_number")
    private int phoneNumber;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    /**
     * Relación ManyToMany con la entidad Michis.
     * Se mapea inversamente a través del atributo "users" en la entidad Michis.
     */
    @ManyToMany(mappedBy = "users")
    private Set<Michis> michis = new HashSet<>();

    @OneToMany(mappedBy = "users")
    private Set<Bookings> bookings = new HashSet<>();

    public enum Role {
        user,
        admin
    }
}
