package com.ftm.controller;

import com.ftm.domain.Product;
import com.ftm.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> all(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            log.info("Accediendo a productos de la categoría con ID: " + categoryId);
            return this.productService.findByCategoryId(categoryId);
        }
        log.info("Accediendo a todos los productos");
        return this.productService.all();
    }

    @GetMapping("/{id}")
    public Product one(@PathVariable("id") Long id) {
        return this.productService.one(id);
    }

    @PostMapping
    public Product newProducts(@RequestBody Product product) {
        return this.productService.save(product);
    }

    @PutMapping("/{id}")
    public Product replaceProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        return this.productService.replace(id, product);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteProducts(@PathVariable("id") Long id) {
        this.productService.delete(id);
    }

    @GetMapping("/by-category")
    public List<Product> getProductsByCategory(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return productService.findByCategoryId(categoryId);
        }
        return productService.all();
    }

}
