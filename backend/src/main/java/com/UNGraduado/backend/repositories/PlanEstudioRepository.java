package com.UNGraduado.backend.repositories;

import com.UNGraduado.backend.dto.PlanCreditosDTO;
import com.UNGraduado.backend.models.PlanEstudio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PlanEstudioRepository extends JpaRepository<PlanEstudio, Integer> {

    /*
     Obtiene el total de créditos por cada plan de estudio.
     Esta consulta personalizada utiliza JPQL para agrupar los planes de estudio por su nombre
     y sumar los créditos de todas las materias asociadas a cada plan. El resultado se mapea
     directamente a objetos com.graduacionunal.backend.dto.PlanCreditosDTO que contienen
     el nombre del plan y la suma total de créditos.
     */
    @Query("""
        SELECT new com.graduacionunal.backend.dto.PlanCreditosDTO(
            p.nomPlan, 
            SUM(m.numCreditos)
        )
        FROM PlanEstudio p
        JOIN p.materiasPorPlan mp
        JOIN mp.materia m
        GROUP BY p.nomPlan    
            """)
    List<PlanCreditosDTO> obtenerCreditosTotalesPorPlan();
}