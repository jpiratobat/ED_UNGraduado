package com.UNGraduado.backend.services;

import com.UNGraduado.backend.models.PlanEstudio;
import com.UNGraduado.backend.dto.PlanCreditosDTO;
import com.UNGraduado.backend.repositories.PlanEstudioRepository;

import java.util.List;
// Implementacion para la interfaz PlanEstudioService 
public class PlanEstudioServiceImpl implements PlanEstudioService {

    private final PlanEstudioRepository planEstudioRepository;

    public PlanEstudioServiceImpl(PlanEstudioRepository planEstudioRepository) {
        this.planEstudioRepository = planEstudioRepository;
    }

    @Override
    public List<PlanEstudio> obtenerTodos() {
        return planEstudioRepository.findAll();
    }

    @Override
    public PlanEstudio guardar(PlanEstudio planEstudio) {
        return planEstudioRepository.save(planEstudio);
    }

    @Override
    public List<PlanCreditosDTO> obtenerCreditosTotalesPorPlan() {
        return planEstudioRepository.obtenerCreditosTotalesPorPlan();
    }
    
    @Override
    public PlanEstudio obtenerPorId(Integer idPlanEstudio){
        return planEstudioRepository.findById(idPlanEstudio).orElse(null);
    }
}
