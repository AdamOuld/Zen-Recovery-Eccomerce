package dev.zen.recovery.models;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "customer")
@Data

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;


}
