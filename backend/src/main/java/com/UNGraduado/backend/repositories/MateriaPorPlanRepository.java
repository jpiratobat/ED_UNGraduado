package com.UNGraduado.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.UNGraduado.backend.models.MateriaPorPlan;
import com.UNGraduado.backend.models.MateriaPorPlanId;

public interface MateriaPorPlanRepository extends JpaRepository<MateriaPorPlan, MateriaPorPlanId> {

}
