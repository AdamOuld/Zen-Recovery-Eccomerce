package dev.zen.recovery.controllers;


import dev.zen.recovery.models.SubRequest;
import dev.zen.recovery.services.EmailSenderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailSenderController {

    EmailSenderService emailSenderService;

    public EmailSenderController(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/subscribe")
    public void addToSubscriptionList(@RequestBody SubRequest subRequest) {
        emailSenderService.addToSubscriptionList(subRequest.getEmail());
    }
}
