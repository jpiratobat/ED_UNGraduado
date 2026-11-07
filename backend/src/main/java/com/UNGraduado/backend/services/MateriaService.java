package com.UNGraduado.backend.services;


import java.util.List;

import com.UNGraduado.backend.models.Materia;


public interface MateriaService {
    List<Materia> obtenerTodos();
    Materia guardar (Materia materia);
    Materia obtenerPorId(Integer idMateria);
    Materia eliminarPorId(Integer idMateria);

}
