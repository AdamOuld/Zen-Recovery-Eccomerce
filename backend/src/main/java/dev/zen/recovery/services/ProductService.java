package dev.zen.recovery.services;


import dev.zen.recovery.models.Product;
import dev.zen.recovery.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProductsByCategoryId (Long id) {
        return productRepository.findByCategoryId(id);
    }

    public Optional<Product> getProductById (Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
