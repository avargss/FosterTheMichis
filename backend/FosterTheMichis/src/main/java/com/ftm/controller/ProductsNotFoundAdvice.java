package com.ftm.controller;

import com.ftm.exception.ProductsNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ProductsNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(ProductsNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String productsNotFoundHandler(ProductsNotFoundException productsNotFoundException) {
        return productsNotFoundException.getMessage();
    }
}
