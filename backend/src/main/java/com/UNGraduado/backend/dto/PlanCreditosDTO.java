package com.UNGraduado.backend.dto;

public class PlanCreditosDTO {
    private String nomPlan;
    private Integer totalCreditos;

    public PlanCreditosDTO(String nomPlan, Integer totalCreditos) {
        this.nomPlan = nomPlan;
        this.totalCreditos = totalCreditos;
    }

    public String getNomPlan() {
        return nomPlan;
    }

    public Integer getTotalCreditos() {
        return totalCreditos;
    }
}
