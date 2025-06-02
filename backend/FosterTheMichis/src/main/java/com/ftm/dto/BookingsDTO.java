package com.ftm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingsDTO {
    private Long id;
    private LocalDateTime date;
    private int peopleNumber;
    private String comments;
    private Long userId;
}