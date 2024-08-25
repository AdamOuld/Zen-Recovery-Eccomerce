package dev.zen.recovery.models;

import lombok.Data;

import java.util.List;


@Data
public class CartInfo {
    private List<CartInfoItem> items;
    private double totalPrice;

    // Getters and setters
}
