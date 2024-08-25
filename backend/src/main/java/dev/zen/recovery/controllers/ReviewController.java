package dev.zen.recovery.controllers;


import dev.zen.recovery.models.Review;
import dev.zen.recovery.models.ReviewWrapper;
import dev.zen.recovery.services.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProductId(@PathVariable Long productId) {
        return reviewService.getByProductId(productId);
    }

    @PostMapping("/submit-review")
    public void submitReview(@RequestBody ReviewWrapper reviewData) {
        reviewService.submitReview(reviewData);
    }
}
