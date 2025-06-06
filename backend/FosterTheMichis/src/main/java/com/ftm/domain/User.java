package com.ftm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
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
public class User implements UserDetails {

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
    private role role;

    /**
     * Relación ManyToMany con la entidad Michis.
     * Se mapea inversamente a través del atributo "users" en la entidad Michis.
     */
    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private Set<Michi> michis = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Bookings> bookings = new HashSet<>();

    public enum role {
        admin,
        user
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Set.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
