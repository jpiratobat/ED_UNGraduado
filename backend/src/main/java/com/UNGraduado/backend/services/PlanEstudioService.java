package com.UNGraduado.backend.services;


import java.util.List;
import com.UNGraduado.backend.dto.PlanCreditosDTO;
import com.UNGraduado.backend.models.PlanEstudio;

public interface PlanEstudioService {
    List<PlanEstudio> obtenerTodos();
    PlanEstudio guardar(PlanEstudio planEstudio);
    List<PlanCreditosDTO> obtenerCreditosTotalesPorPlan();
}
