package com.ftm.exception;

public class MichiNotFoundException extends RuntimeException {
    public MichiNotFoundException(Long id) {
        super("No se ha encontrado el michi con id: " + id);
    }
}
