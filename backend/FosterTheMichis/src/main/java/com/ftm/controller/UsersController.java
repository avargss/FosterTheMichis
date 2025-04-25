package com.ftm.controller;

import com.ftm.domain.Users;
import com.ftm.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> all() {
        log.info("Accediendo a todos los usuarios");
        return this.usersService.all();
    }

    @GetMapping("/{id}")
    public Users one(@PathVariable("id") Long id) {
        return this.usersService.one(id);
    }

    @PostMapping
    public Users newUsers(@RequestBody Users users) {
        return this.usersService.save(users);
    }

    @PutMapping("/{id}")
    public Users replaceUsers(@PathVariable("id") Long id, @RequestBody Users users) {
        return this.usersService.replace(id, users);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteUsers(@PathVariable("id") Long id) {
        this.usersService.delete(id);
    }
}