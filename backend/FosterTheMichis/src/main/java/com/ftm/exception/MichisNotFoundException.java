package com.ftm.exception;

public class MichisNotFoundException extends RuntimeException {
    public MichisNotFoundException(Long id) {
        super("No se ha encontrado el michi con id: " + id);
    }
}
