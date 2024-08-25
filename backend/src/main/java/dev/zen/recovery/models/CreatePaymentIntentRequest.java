package dev.zen.recovery.models;

public class CreatePaymentIntentRequest {
    private Long amount; // Amount in cents

    // Getters and setters
    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
