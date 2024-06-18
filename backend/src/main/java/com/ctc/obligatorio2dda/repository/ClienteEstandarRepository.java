package com.ctc.obligatorio2dda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctc.obligatorio2dda.entity.ClienteEstandar;

@Repository
public interface ClienteEstandarRepository extends JpaRepository<ClienteEstandar, Long>{
    
}