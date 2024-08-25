package dev.zen.recovery.repositories;

import dev.zen.recovery.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> getByProductId(Long productId);
}
