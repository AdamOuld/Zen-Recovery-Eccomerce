package dev.zen.recovery.services;


import dev.zen.recovery.models.Review;
import dev.zen.recovery.models.ReviewWrapper;
import dev.zen.recovery.repositories.ProductRepository;
import dev.zen.recovery.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {
    ReviewRepository reviewRepository;
    ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public List<Review> getByProductId (Long productId) {
        return reviewRepository.getByProductId(productId);
    }

    public void submitReview(ReviewWrapper reviewData) {
        Review review = new Review();
        review.setRating(reviewData.getRating());
        review.setGuestEmail(reviewData.getGuestEmail());
        review.setComment(reviewData.getComment());
        review.setProduct(productRepository.findById(reviewData.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found")));
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        reviewRepository.save(review);
    }
}
