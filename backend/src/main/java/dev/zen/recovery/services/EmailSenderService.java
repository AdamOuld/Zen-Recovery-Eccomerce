package dev.zen.recovery.services;


import dev.zen.recovery.models.Customer;
import dev.zen.recovery.repositories.EmailSenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    private final EmailSenderRepository emailSenderRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailSenderService(EmailSenderRepository emailSenderRepository, JavaMailSender javaMailSender) {
        this.emailSenderRepository = emailSenderRepository;
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("zenrecoveryproducts@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        javaMailSender.send(message);

    }

    public void addToSubscriptionList(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email must not be null or empty");
        }
        Customer customer = new Customer();
        customer.setEmail(email);
        emailSenderRepository.save(customer);
        String subject = "Subscription Confirmation";
        String body = "Thank you for subscribing to Zen Recovery Products Newsletter! We'll keep you updated with the latest news and offers.";
        sendEmail(email, subject, body);


    }
}
