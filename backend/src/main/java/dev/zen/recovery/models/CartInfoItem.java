package dev.zen.recovery.models;


import lombok.Data;

@Data
public class CartInfoItem {
    private Long id;
    private String name;
    private int quantity;
    private double price;

    // Getters and setters
}
