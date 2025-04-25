package com.ftm.controller;

import com.ftm.exception.MichisNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MichisNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(MichisNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String michisNotFoundHandler(MichisNotFoundException michisNotFoundException) {
        return michisNotFoundException.getMessage();
    }
}
