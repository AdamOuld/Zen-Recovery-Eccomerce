package dev.zen.recovery.models;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class CheckoutRequest {
    private CartInfo cartInfo;
    private ShippingInfo shippingInfo;
    private PaymentMethodRequest paymentMethod;

}


