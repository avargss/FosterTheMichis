package com.ftm.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("No se ha encontrado el producto con id: " + id);
    }
}
