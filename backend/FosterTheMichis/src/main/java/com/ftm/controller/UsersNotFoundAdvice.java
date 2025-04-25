package com.ftm.controller;

import com.ftm.exception.UsersNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UsersNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(UsersNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String usersNotFoundHandler(UsersNotFoundException usersNotFoundException) {
        return usersNotFoundException.getMessage();
    }
}
