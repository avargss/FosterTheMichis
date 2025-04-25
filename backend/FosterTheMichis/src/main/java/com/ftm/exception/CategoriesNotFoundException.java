package com.ftm.exception;

public class CategoriesNotFoundException extends RuntimeException {
    public CategoriesNotFoundException(Long id) {
        super("No se ha encontrado la categoria con id: " + id);
    }
}
