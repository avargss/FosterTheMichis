package com.ftm.service;

import com.ftm.domain.Michis;
import com.ftm.exception.MichisNotFoundException;
import com.ftm.repository.MichisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MichisService {

    @Autowired
    private MichisRepository michisRepository;

    public MichisService(MichisRepository michisRepository) {
        this.michisRepository = michisRepository;
    }

    public List<Michis> all() {
        return this.michisRepository.findAll();
    }

    public Michis save(Michis michis) {
        return this.michisRepository.save(michis);
    }

    public Michis one(Long id) {
        return this.michisRepository.findById(id)
                .orElseThrow(() -> new MichisNotFoundException(id));
    }

    public Michis replace(Long id, Michis michis) {
        return this.michisRepository.findById(id).map(m -> (id.equals(michis.getId()) ?
                        this.michisRepository.save(michis) : null))
                .orElseThrow(() -> new MichisNotFoundException(id));
    }

    public void delete(Long id) {
        this.michisRepository.findById(id).map(m -> {
                    this.michisRepository.delete(m);
                    return m;
                })
                .orElseThrow(() -> new MichisNotFoundException(id));
    }
}
