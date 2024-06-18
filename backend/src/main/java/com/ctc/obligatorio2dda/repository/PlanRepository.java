package com.ctc.obligatorio2dda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ctc.obligatorio2dda.entity.Plan;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query(value = "SELECT p.* FROM planes p INNER JOIN planes_clientes pc ON p.id = pc.plan_id WHERE pc.cliente_id = :clienteId", nativeQuery = true)
    public List<Plan> findPlanesByClienteId(@Param("clienteId") Long clienteId);
}