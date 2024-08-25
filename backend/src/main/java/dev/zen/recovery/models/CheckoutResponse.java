package dev.zen.recovery.models;


import lombok.Data;

@Data
public class CheckoutResponse {
    private boolean success;
    private String message;
    private String orderId;

    public CheckoutResponse(boolean success, String message, Long orderId) {
        this.success = success;
        this.message = message;
        this.orderId = String.valueOf(orderId);
    }

    // Getters and setters
}
