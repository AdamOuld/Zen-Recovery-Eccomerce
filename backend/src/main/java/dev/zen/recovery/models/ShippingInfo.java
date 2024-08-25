package dev.zen.recovery.models;


import lombok.Data;

@Data
public class ShippingInfo {
    private String name;
    private String email;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String phone;

    // Getters and setters
}
