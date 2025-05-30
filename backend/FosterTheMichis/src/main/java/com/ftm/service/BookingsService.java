package com.ftm.service;

import com.ftm.domain.Booking;
import com.ftm.exception.BookingNotFoundException;
import com.ftm.repository.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingsService {

    @Autowired
    private BookingsRepository bookingRepository;

    public BookingsService(BookingsRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> all() {
        return this.bookingRepository.findAll();
    }

    public Booking save(Booking booking) {
        return this.bookingRepository.save(booking);
    }

    public Booking one(Long id) {
        return this.bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    public Booking replace(Long id, Booking booking) {
        return this.bookingRepository.findById(id).map(b -> (id.equals(booking.getId()) ?
                        this.bookingRepository.save(booking) : null))
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    public void delete(Long id) {
        this.bookingRepository.findById(id).map(b -> {
                    this.bookingRepository.delete(b);
                    return b;
                })
                .orElseThrow(() -> new BookingNotFoundException(id));
    }
}