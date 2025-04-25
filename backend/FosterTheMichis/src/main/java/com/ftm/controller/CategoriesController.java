package com.ftm.controller;

import com.ftm.domain.Categories;
import com.ftm.service.CategoriesService;
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
    private CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }

    @GetMapping
    public List<Categories> all() {
        log.info("Accediendo a todas las categorías");
        return this.categoriesService.all();
    }

    @GetMapping("/{id}")
    public Categories one(@PathVariable Long id) {
        return this.categoriesService.one(id);
    }

    @PostMapping
    public Categories newCategory(@RequestBody Categories categories) {
        return this.categoriesService.save(categories);
    }

    @PutMapping("/{id}")
    public Categories replaceCategory(@PathVariable Long id, @RequestBody Categories categories) {
        return this.categoriesService.replace(id, categories);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable("id") Long id) {
        this.categoriesService.delete(id);
    }
}