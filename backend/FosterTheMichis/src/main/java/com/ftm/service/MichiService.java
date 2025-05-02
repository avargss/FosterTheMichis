package com.ftm.service;

import com.ftm.domain.Michi;
import com.ftm.exception.MichiNotFoundException;
import com.ftm.repository.MichiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MichiService {

    @Autowired
    private MichiRepository michiRepository;

    public MichiService(MichiRepository michiRepository) {
        this.michiRepository = michiRepository;
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
}
