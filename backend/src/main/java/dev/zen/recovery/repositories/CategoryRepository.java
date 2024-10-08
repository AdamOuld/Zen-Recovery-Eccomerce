package dev.zen.recovery.repositories;

import dev.zen.recovery.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
