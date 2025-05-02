package com.ftm.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("No se ha encontrado el usuario con id: " + id);
    }
}
