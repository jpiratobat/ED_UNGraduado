package com.UNGraduado.backend.dto;

public class PlanCreditosDTO {
    private String nomPlan;
    private Long totalCreditos;

    public PlanCreditosDTO(String nomPlan, Long totalCreditos) {
        this.nomPlan = nomPlan;
        this.totalCreditos = totalCreditos;
    }

    public String getNomPlan() {
        return nomPlan;
    }

    public Long getTotalCreditos() {
        return totalCreditos;
    }
}
