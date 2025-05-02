package com.ftm.service;

import com.ftm.domain.Category;
import com.ftm.exception.CategoryNotFoundException;
import com.ftm.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> all() {
        return this.categoryRepository.findAll();
    }

    public Category save(Category category) {
        return this.categoryRepository.save(category);
    }

    public Category one(Long id) {
        return this.categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    public Category replace(Long id, Category category) {
        return this.categoryRepository.findById(id).map(c -> (id.equals(category.getId()) ?
                        this.categoryRepository.save(category) : null))
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    public void delete(Long id) {
        this.categoryRepository.findById(id).map(c -> {
                    this.categoryRepository.delete(c);
                    return c;
                })
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }
}
