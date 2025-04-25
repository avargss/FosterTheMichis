package com.ftm.repository;

import com.ftm.domain.Michis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MichisRepository extends JpaRepository<Michis, Long> {
}
