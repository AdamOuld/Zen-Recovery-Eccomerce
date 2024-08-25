package dev.zen.recovery.models;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReviewWrapper {
    private String guestEmail;

    private Integer rating;

    private String comment;

    private Long productId;
}
