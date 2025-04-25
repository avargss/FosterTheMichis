package com.ftm.exception;

public class UsersNotFoundException extends RuntimeException {
    public UsersNotFoundException(Long id) {
        super("No se ha encontrado el usuario con id: " + id);
    }
}
