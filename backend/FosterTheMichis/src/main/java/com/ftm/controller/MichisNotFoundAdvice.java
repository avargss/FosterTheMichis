package com.ftm.controller;

import com.ftm.exception.MichiNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MichisNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(MichiNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String michisNotFoundHandler(MichiNotFoundException michiNotFoundException) {
        return michiNotFoundException.getMessage();
    }
}
