package com.ftm.service;

import com.ftm.domain.Product;
import com.ftm.exception.ProductNotFoundException;
import com.ftm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> all() {
        return this.productRepository.findAll();
    }

    public Product save(Product product) {
        return this.productRepository.save(product);
    }

    public Product one(Long id) {
        return this.productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public Product replace(Long id, Product product) {
        return this.productRepository.findById(id).map(p -> (id.equals(product.getId()) ?
                        this.productRepository.save(product) : null))
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public void delete(Long id) {
        this.productRepository.findById(id).map(p -> {
                    this.productRepository.delete(p);
                    return p;
                })
                .orElseThrow(() -> new ProductNotFoundException(id));
    }
}
