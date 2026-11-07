package com.UNGraduado.backend.dto;

public class MateriaDTO {
    private String nomMateria;
    private Integer numCreditos;

    public MateriaDTO(String nomMateria, Integer numCreditos) {
        this.nomMateria = nomMateria;
        this.numCreditos = numCreditos;
    }

    public String getNomMateria() {
        return nomMateria;
    }  

    public Integer getNumCreditos() {
        return numCreditos;
    } 
}
