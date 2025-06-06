package com.ftm.service;

import com.ftm.domain.Michi;
import com.ftm.domain.User;
import com.ftm.exception.MichiNotFoundException;
import com.ftm.exception.UserNotFoundException;
import com.ftm.repository.MichiRepository;
import com.ftm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MichiService {

    private final MichiRepository michiRepository;
    private final UserRepository userRepository;

    public MichiService(MichiRepository michiRepository, UserRepository userRepository) {
        this.michiRepository = michiRepository;
        this.userRepository = userRepository;
    }

    public List<Michi> all() {
        return this.michiRepository.findAll();
    }

    public Michi save(Michi michi) {
        return this.michiRepository.save(michi);
    }

    public Michi one(Long id) {
        return this.michiRepository.findById(id)
                .orElseThrow(() -> new MichiNotFoundException(id));
    }

    public Michi replace(Long id, Michi michi) {
        return this.michiRepository.findById(id).map(m -> (id.equals(michi.getId()) ?
                        this.michiRepository.save(michi) : null))
                .orElseThrow(() -> new MichiNotFoundException(id));
    }

    public void delete(Long id) {
        this.michiRepository.findById(id).map(m -> {
                    this.michiRepository.delete(m);
                    return m;
                })
                .orElseThrow(() -> new MichiNotFoundException(id));
    }

    public List<Michi> findNonAdoptableMichis() {
        return michiRepository.findByAdoptableFalse();
    }

    public List<Michi> findAdoptableMichis() {
        return michiRepository.findByAdoptableTrue();
    }

    // Obtiene la lista de michis adoptados por un usuario.
    public List<Michi> getAdoptionList(Long userId) {
        return michiRepository.findByUsers_Id(userId);
    }

    // Añade un michi a la lista de adopción de un usuario.
    public Michi addMichiToUser(Long userId, Long michiId) {
        Michi michi = michiRepository.findById(michiId)
                .orElseThrow(() -> new MichiNotFoundException(michiId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        // Si no estaba ya en su lista, lo añade
        if (!michi.getUsers().contains(user)) {
            michi.getUsers().add(user);
            user.getMichis().add(michi); // opcional, por consistencia de la bi-dirección
            /* Es suficiente con guardar michi,
               JPA actualizará la tabla michi_user. */
            return michiRepository.save(michi);
        }
        return michi;
    }

    // Elimina un michi de la lista de adopción de un usuario.
    public void removeMichiFromUser(Long userId, Long michiId) {
        Michi michi = michiRepository.findById(michiId)
                .orElseThrow(() -> new MichiNotFoundException(michiId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        if (michi.getUsers().contains(user)) {
            michi.getUsers().remove(user);
            user.getMichis().remove(michi);
            michiRepository.save(michi);
        }
    }
}
