package com.ftm.service;

import com.ftm.domain.Categories;
import com.ftm.exception.CategoriesNotFoundException;
import com.ftm.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepository;

    public CategoriesService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public List<Categories> all() {
        return this.categoriesRepository.findAll();
    }

    public Categories save(Categories categories) {
        return this.categoriesRepository.save(categories);
    }

    public Categories one(Long id) {
        return this.categoriesRepository.findById(id)
                .orElseThrow(() -> new CategoriesNotFoundException(id));
    }

    public Categories replace(Long id, Categories categories) {
        return this.categoriesRepository.findById(id).map(c -> (id.equals(categories.getId()) ?
                        this.categoriesRepository.save(categories) : null))
                .orElseThrow(() -> new CategoriesNotFoundException(id));
    }

    public void delete(Long id) {
        this.categoriesRepository.findById(id).map(c -> {
                    this.categoriesRepository.delete(c);
                    return c;
                })
                .orElseThrow(() -> new CategoriesNotFoundException(id));
    }
}
