package dev.zen.recovery.repositories;


import dev.zen.recovery.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailSenderRepository extends JpaRepository<Customer, Long> {
}
