package com.ftm.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bookings")
    private Long id;

    // Se usa LocalDateTime para mapear el campo DATETIME
    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    // En el esquema es "people_number" y representa el número de personas
    @Column(name = "people_number", nullable = false)
    private int peopleNumber;

    @Column(name = "comments", columnDefinition = "TEXT", nullable = false)
    private String comments;

    /**
     * Relación ManyToOne con la entidad Users.
     * Se utiliza la columna "id_user" de la tabla bookings que hace referencia
     * a la columna "id_users" de la tabla users.
     */
    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_users", nullable = false)
    private User user;
}
