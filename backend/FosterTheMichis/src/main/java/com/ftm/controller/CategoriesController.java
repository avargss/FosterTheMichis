package com.ftm.controller;

import com.ftm.domain.Category;
import com.ftm.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/categories")
public class CategoriesController {

    @Autowired
    private CategoryService categoryService;

    public CategoriesController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> all() {
        log.info("Accediendo a todas las categorías");
        return this.categoryService.all();
    }

    @GetMapping("/{id}")
    public Category one(@PathVariable Long id) {
        return this.categoryService.one(id);
    }

    @PostMapping
    public Category newCategory(@RequestBody Category category) {
        return this.categoryService.save(category);
    }

    @PutMapping("/{id}")
    public Category replaceCategory(@PathVariable Long id, @RequestBody Category category) {
        return this.categoryService.replace(id, category);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable("id") Long id) {
        this.categoryService.delete(id);
    }
}