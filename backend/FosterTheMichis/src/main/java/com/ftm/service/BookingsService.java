package com.ftm.service;

import com.ftm.domain.Bookings;
import com.ftm.domain.User;
import com.ftm.exception.BookingNotFoundException;
import com.ftm.exception.UserNotFoundException;
import com.ftm.repository.BookingsRepository;
import com.ftm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
public class BookingsService {

    @Autowired
    private BookingsRepository bookingsRepository;

    public BookingsService(BookingsRepository bookingsRepository, UserRepository userRepository) {
        this.bookingsRepository = bookingsRepository;
    }

    public List<Bookings> all() {
        return this.bookingsRepository.findAll();
    }

    public Bookings save(Bookings bookings) {
        return this.bookingsRepository.save(bookings);
    }

    public Bookings one(Long id) {
        return this.bookingsRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    public Bookings replace(Long id, Bookings bookings) {
        return this.bookingsRepository.findById(id).map(b -> (id.equals(bookings.getId()) ?
                        this.bookingsRepository.save(bookings) : null))
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    public void delete(Long id) {
        this.bookingsRepository.findById(id).map(b -> {
                    this.bookingsRepository.delete(b);
                    return b;
                })
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    public List<Bookings> findByUserId(Long userId) {
        return bookingsRepository.findByUserId(userId);
    }
}