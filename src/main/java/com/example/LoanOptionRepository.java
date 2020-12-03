package com.example;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanOptionRepository extends JpaRepository<LoanOption, Long> {
    List<LoanOption> findByUserId(Long id);
}
