package com.ftm.exception;

public class ProductsNotFoundException extends RuntimeException {
    public ProductsNotFoundException(Long id) {
        super("No se ha encontrado el producto con id: " + id);
    }
}
