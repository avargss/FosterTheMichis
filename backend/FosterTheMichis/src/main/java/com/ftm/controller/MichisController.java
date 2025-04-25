package com.ftm.controller;

import com.ftm.domain.Michis;
import com.ftm.service.MichisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/michis")
public class MichisController {

    @Autowired
    private MichisService michisService;

    public MichisController(MichisService michisService) {
        this.michisService = michisService;
    }

    @GetMapping
    public List<Michis> all() {
        log.info("Accediendo a todos los michis");
        return this.michisService.all();
    }

    @GetMapping("/{id}")
    public Michis one(@PathVariable("id") Long id) {
        return this.michisService.one(id);
    }

    @PostMapping
    public Michis newMichis(@RequestBody Michis michis) {
        return this.michisService.save(michis);
    }

    @PutMapping("/{id}")
    public Michis replaceMichis(@PathVariable("id") Long id, @RequestBody Michis michis) {
        return this.michisService.replace(id, michis);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteMichis(@PathVariable("id") Long id) {
        this.michisService.delete(id);
    }
}
