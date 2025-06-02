package com.ftm.controller;

import com.ftm.domain.Bookings;
import com.ftm.domain.User;
import com.ftm.dto.BookingsDTO;
import com.ftm.service.BookingsService;
import com.ftm.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/bookings")
public class BookingsController {

    @Autowired
    private BookingsService bookingsService;

    public BookingsController(BookingsService bookingsService) {
        this.bookingsService = bookingsService;
    }

    @GetMapping
    public List<Bookings> all() {
        log.info("Accediendo a todas las reservas");
        return this.bookingsService.all();
    }

    @GetMapping("/{id}")
    public Bookings one(@PathVariable Long id) {
        return this.bookingsService.one(id);
    }

    @GetMapping("/user/{userId}")
    public List<Bookings> getBookingsByUserId(@PathVariable Long userId) {
        return bookingsService.findByUserId(userId);
    }

    @PostMapping
    public Bookings newBooking(@RequestBody Bookings bookings) {
        return this.bookingsService.save(bookings);
    }

    @PutMapping("/{id}")
    public Bookings replaceBooking(@PathVariable Long id, @RequestBody Bookings bookings) {
        return this.bookingsService.replace(id, bookings);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable("id") Long id) {
        this.bookingsService.delete(id);
    }
}