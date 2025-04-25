package com.ftm.service;

import com.ftm.domain.Products;
import com.ftm.exception.ProductsNotFoundException;
import com.ftm.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public List<Products> all() {
        return this.productsRepository.findAll();
    }

    public Products save(Products products) {
        return this.productsRepository.save(products);
    }

    public Products one(Long id) {
        return this.productsRepository.findById(id)
                .orElseThrow(() -> new ProductsNotFoundException(id));
    }

    public Products replace(Long id, Products products) {
        return this.productsRepository.findById(id).map(p -> (id.equals(products.getId()) ?
                        this.productsRepository.save(products) : null))
                .orElseThrow(() -> new ProductsNotFoundException(id));
    }

    public void delete(Long id) {
        this.productsRepository.findById(id).map(p -> {
                    this.productsRepository.delete(p);
                    return p;
                })
                .orElseThrow(() -> new ProductsNotFoundException(id));
    }
}
