package com.ftm.controller;

import com.ftm.domain.Booking;
import com.ftm.service.BookingsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public List<Booking> all() {
        log.info("Accediendo a todas las reservas");
        return this.bookingsService.all();
    }

    @GetMapping("/{id}")
    public Booking one(@PathVariable Long id) {
        return this.bookingsService.one(id);
    }

    @PostMapping
    public Booking newBooking(@RequestBody Booking booking) {
        return this.bookingsService.save(booking);
    }

    @PutMapping("/{id}")
    public Booking replaceBooking(@PathVariable Long id, @RequestBody Booking booking) {
        return this.bookingsService.replace(id, booking);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable("id") Long id) {
        this.bookingsService.delete(id);
    }
}