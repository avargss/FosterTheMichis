package com.ftm.exception;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(Long id) {
        super("No se ha encontrado la reserva con id: " + id);
    }
}
