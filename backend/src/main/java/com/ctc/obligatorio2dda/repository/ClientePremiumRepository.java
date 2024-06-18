package com.ctc.obligatorio2dda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctc.obligatorio2dda.entity.ClientePremium;

@Repository
public interface ClientePremiumRepository extends JpaRepository<ClientePremium, Long>{
    
}
