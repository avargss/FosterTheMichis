package com.ftm.controller;

import com.ftm.domain.Products;
import com.ftm.service.ProductsService;
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
    private ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping
    public List<Products> all() {
        log.info("Accediendo a todos los productos");
        return this.productsService.all();
    }

    @GetMapping("/{id}")
    public Products one(@PathVariable("id") Long id) {
        return this.productsService.one(id);
    }

    @PostMapping
    public Products newProducts(@RequestBody Products products) {
        return this.productsService.save(products);
    }

    @PutMapping("/{id}")
    public Products replaceProduct(@PathVariable("id") Long id, @RequestBody Products products) {
        return this.productsService.replace(id, products);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteProducts(@PathVariable("id") Long id) {
        this.productsService.delete(id);
    }

}
