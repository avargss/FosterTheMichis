package com.ftm.repository;

import com.ftm.domain.Michi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MichiRepository extends JpaRepository<Michi, Long> {

    List<Michi> findByAdoptableFalse();

    List<Michi> findByAdoptableTrue();

    @Query("SELECT m FROM Michi m JOIN m.users u WHERE u.id = :userId")
    List<Michi> findAdoptionListByUserId(@Param("userId") Long userId);
}