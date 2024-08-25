package dev.zen.recovery.services;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import dev.zen.recovery.models.*;
import dev.zen.recovery.repositories.OrderRepository;
import dev.zen.recovery.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    private final EmailSenderService emailSenderService;

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, EmailSenderService emailSenderService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.emailSenderService = emailSenderService;
    }
    @Value("${stripe.api.key}")
    private String stripeApiKey;
    public ResponseEntity<CheckoutResponse> createOrder(CheckoutRequest checkoutRequest) {
        com.stripe.Stripe.apiKey = stripeApiKey;
        logger.info("Received request to create order: {}", checkoutRequest);

        try {
            // Confirm the payment using the Payment Intent ID
            logger.info("Retrieving payment intent with ID: {}", checkoutRequest.getPaymentMethod().getPaymentMethodId());
            PaymentIntent paymentIntent = PaymentIntent.retrieve(checkoutRequest.getPaymentMethod().getPaymentMethodId());

            logger.info("Payment intent status: {}", paymentIntent.getStatus());

            if ("succeeded".equals(paymentIntent.getStatus())) {
                // Create the order if payment is successful
                logger.info("Payment succeeded. Creating order in database.");
                Order order = createOrderInDatabase(checkoutRequest.getCartInfo(), checkoutRequest.getShippingInfo(), paymentIntent.getId());

                logger.info("Order created successfully with ID: {}", order.getId());
                return ResponseEntity.ok(new CheckoutResponse(true, "Order placed successfully", order.getId()));
            } else {
                logger.warn("Payment not confirmed. Status: {}", paymentIntent.getStatus());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new CheckoutResponse(false, "Payment not confirmed", null));
            }
        } catch (StripeException e) {
            logger.error("Error processing payment: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CheckoutResponse(false, "Payment failed: " + e.getMessage(), null));
        } catch (Exception e) {
            logger.error("Error creating order: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CheckoutResponse(false, "Order creation failed: " + e.getMessage(), null));
        }
    }

    public Order createOrderInDatabase(CartInfo cart, ShippingInfo shippingInfo, String paymentIntentId) {
        logger.info("Creating order in database with paymentIntentId: {}", paymentIntentId);

        // Create the Order entity
        Order order = new Order();
        order.setGuestEmail(shippingInfo.getEmail());
        order.setGuestFullName(shippingInfo.getName());
        order.setGuestAddress(shippingInfo.getAddress() + ", " + shippingInfo.getCity() + ", " + shippingInfo.getState() + " " + shippingInfo.getZip());
        order.setGuestPhoneNumber(shippingInfo.getPhone());
        order.setStatus(Order.OrderStatus.PENDING); // Set the initial status
        order.setTotal(cart.getTotalPrice());

        // Create OrderItem entities
        Set<OrderItem> orderItems = cart.getItems().stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            // Fetch the Product entity from the repository
            logger.info("Fetching product with ID: {}", item.getId());
            Product product = productRepository.findById(item.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found for id: " + item.getId()));
            orderItem.setProduct(product);

            orderItem.setOrder(order); // Set the parent order
            return orderItem;
        }).collect(Collectors.toSet());
        // Save the Order entity to the database
        logger.info("Saving order to database.");
        sendOrderConfirmationEmail(order);
        return orderRepository.save(order); // Assuming you have an OrderRepository
    }


    public void sendOrderConfirmationEmail(Order order) {
        String toEmail = order.getGuestEmail();
        String subject = "Order Confirmation - Zen Recovery";
        String body = "Dear " + order.getGuestFullName() + ",\n\n" +
                "Thank you for your order!" + ".\n" +
                "We will notify you once your order has been shipped.\n\n" +
                "Order Details:\n" +
                "Total Amount: $" + order.getTotal() + "\n\n" +
                "Shipping Address:\n" + order.getGuestAddress() + "\n\n" +
                "Best regards,\n" +
                "Zen Recovery Team";

        emailSenderService.sendEmail(toEmail, subject, body);
    }
}
