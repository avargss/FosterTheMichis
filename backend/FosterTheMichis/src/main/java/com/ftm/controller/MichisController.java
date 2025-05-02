package com.ftm.controller;

import com.ftm.domain.Michi;
import com.ftm.service.MichiService;
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
    private MichiService michiService;

    public MichisController(MichiService michiService) {
        this.michiService = michiService;
    }

    @GetMapping
    public List<Michi> all() {
        log.info("Accediendo a todos los michis");
        return this.michiService.all();
    }

    @GetMapping("/{id}")
    public Michi one(@PathVariable("id") Long id) {
        return this.michiService.one(id);
    }

    @PostMapping
    public Michi newMichis(@RequestBody Michi michi) {
        return this.michiService.save(michi);
    }

    @PutMapping("/{id}")
    public Michi replaceMichis(@PathVariable("id") Long id, @RequestBody Michi michi) {
        return this.michiService.replace(id, michi);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteMichis(@PathVariable("id") Long id) {
        this.michiService.delete(id);
    }
}
