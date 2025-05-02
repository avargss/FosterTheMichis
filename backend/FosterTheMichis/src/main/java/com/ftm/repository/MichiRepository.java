package com.ftm.repository;

import com.ftm.domain.Michi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MichiRepository extends JpaRepository<Michi, Long> {
}
