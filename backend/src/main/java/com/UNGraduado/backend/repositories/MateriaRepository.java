package com.UNGraduado.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.UNGraduado.backend.models.Materia;

public interface MateriaRepository extends JpaRepository<Materia, Integer> {

}