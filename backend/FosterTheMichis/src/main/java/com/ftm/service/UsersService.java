package com.ftm.service;

import com.ftm.domain.Users;
import com.ftm.exception.UsersNotFoundException;
import com.ftm.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> all() {
        return this.usersRepository.findAll();
    }

    public Users save(Users users) {
        return this.usersRepository.save(users);
    }

    public Users one(Long id) {
        return this.usersRepository.findById(id)
                .orElseThrow(() -> new UsersNotFoundException(id));
    }

    public Users replace(Long id, Users users) {
        return this.usersRepository.findById(id).map(u -> (id.equals(users.getId()) ?
                        this.usersRepository.save(users) : null))
                .orElseThrow(() -> new UsersNotFoundException(id));
    }

    public void delete(Long id) {
        this.usersRepository.findById(id).map(u -> {
                    this.usersRepository.delete(u);
                    return u;
                })
                .orElseThrow(() -> new UsersNotFoundException(id));
    }
}
