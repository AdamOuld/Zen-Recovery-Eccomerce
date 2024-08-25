package dev.zen.recovery.controllers;


import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import dev.zen.recovery.models.CheckoutRequest;
import dev.zen.recovery.models.CheckoutResponse;
import dev.zen.recovery.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {


    @Autowired
    OrderService orderService;



    @PostMapping(value = "/create-order", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CheckoutResponse> createOrder(@RequestBody CheckoutRequest checkoutRequest) {
        return orderService.createOrder(checkoutRequest);
    }

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> paymentInfo) {
        try {
            // Step 1: Initialize Stripe API key
            com.stripe.Stripe.apiKey = stripeApiKey;

            // Step 2: Create PaymentIntent parameters
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(((Number) paymentInfo.get("amount")).longValue()) // amount in cents
                    .setCurrency("usd")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods
                                    .builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .build();

            // Step 3: Create PaymentIntent
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Step 4: Return clientSecret to the frontend
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            // Handle Stripe exceptions
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
