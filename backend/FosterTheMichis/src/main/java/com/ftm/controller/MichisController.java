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

    @GetMapping("/non-adoptable")
    public List<Michi> getNonAdoptableMichis() {
        log.info("Accediendo a los michis no adoptables");
        return michiService.findNonAdoptableMichis();
    }

    @GetMapping("/adoptable")
    public List<Michi> getAdoptableMichis() {
        log.info("Accediendo a los michis adoptables");
        return michiService.findAdoptableMichis();
    }

    @GetMapping("/adoption-list/{userId}")
    public List<Michi> getAdoptionListByUser(@PathVariable("userId") Long userId) {
        log.info("Accediendo a la lista de adopción del usuario {}", userId);
        return this.michiService.getAdoptionList(userId);
    }

    @PostMapping("/{michiId}/adopt/{userId}")
    public Michi adoptMichi(@PathVariable("michiId") Long michiId, @PathVariable("userId") Long userId) {
        log.info("Usuario {} está adoptando (o añadiendo a su lista) el michi {}", userId, michiId);
        return this.michiService.addMichiToUser(userId, michiId);
    }

    @DeleteMapping("/{michiId}/adopt/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeAdoption(@PathVariable("michiId") Long michiId, @PathVariable("userId") Long userId) {
        log.info("Usuario {} quita al michi {} de su lista de adopción", userId, michiId);
        this.michiService.removeMichiFromUser(userId, michiId);
    }
}
