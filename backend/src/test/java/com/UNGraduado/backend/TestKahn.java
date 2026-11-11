package com.UNGraduado.backend;

import com.UNGraduado.backend.datastructures.KahnSemesterCalculator;
import com.UNGraduado.backend.models.Materia;
import com.UNGraduado.backend.models.Prerrequisito;

import java.util.ArrayList;
import java.util.List;

public class TestKahn {
    public static void main(String[] args) {
        System.out.println("=== PRUEBA INDEPENDIENTE: ALGORITMO KAHN ===");
        
        KahnSemesterCalculator calculador = new KahnSemesterCalculator();
        int maxMateriasPorSemestre = 5;

        
        int[] tamanios = {100, 500, 1000, 5000, 10000};

        for (int n : tamanios) {
            List<Materia> materias = new ArrayList<>();
            List<Prerrequisito> prerrequisitos = new ArrayList<>();
            
          
            for (int i = 0; i < n; i++) {
                materias.add(new Materia(i, "Materia_" + i, 3));
            }
            for (int i = 1; i < n; i++) {
                prerrequisitos.add(new Prerrequisito(materias.get(i), materias.get(i - 1)));
            }

            
            for (int i = 0; i < 3; i++) {
                calculador.calcularSemestresMinimos(materias, prerrequisitos, maxMateriasPorSemestre);
            }

            
            long inicio = System.nanoTime();
            var resultado = calculador.calcularSemestresMinimos(materias, prerrequisitos, maxMateriasPorSemestre);
            long fin = System.nanoTime();
            
            double ms = (fin - inicio) / 1_000_000.0;
            
            System.out.printf("Materias: %5d | Tiempo: %8.3f ms | Semestres: %2d | ¿Ciclo?: %b%n", 
                    n, ms, resultado.getMinSemesters(), resultado.hasCycle());
        }
    }
}
