package com.UNGraduado.backend.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class QueueSinglyLinkedListTest {

    private QueueSinglyLinkedList<String> listaMaterias;

    @BeforeEach
    void setUp() {
        listaMaterias = new QueueSinglyLinkedList<>();
    }

    @Test
    void testListaIniciaVacia() {
        assertTrue(listaMaterias.isEmpty());
        assertEquals(0, listaMaterias.size());
    }

    @Test
    void testAgregarElementos() {
        listaMaterias.add("Calculo I");
        listaMaterias.add("Programacion I");

        assertFalse(listaMaterias.isEmpty());
        assertEquals(2, listaMaterias.size());
    }

    @Test
    void testEliminarElementoAlInicio() {
        listaMaterias.add("Calculo I");
        listaMaterias.add("Programacion I");

        boolean eliminado = listaMaterias.delete("Calculo I");

        assertTrue(eliminado);
        assertEquals(1, listaMaterias.size());
    }

    @Test
    void testEliminarElementoEnCualquierPosicion() {
        listaMaterias.add("Calculo I");
        listaMaterias.add("Programacion I");
        listaMaterias.add("Algebra Lineal");

        // Eliminar en el medio / final sin importar el orden
        boolean eliminado = listaMaterias.delete("Programacion I");

        assertTrue(eliminado);
        assertEquals(2, listaMaterias.size());
    }

    @Test
    void testEliminarElementoInexistente() {
        listaMaterias.add("Calculo I");

        boolean eliminado = listaMaterias.delete("Física I");

        assertFalse(eliminado);
        assertEquals(1, listaMaterias.size());
    }

    @Test
    void testVaciarListaCompleta() {
        listaMaterias.add("Calculo I");
        listaMaterias.add("Programacion I");

        listaMaterias.delete("Calculo I");
        listaMaterias.delete("Programacion I");

        assertTrue(listaMaterias.isEmpty());
        assertEquals(0, listaMaterias.size());
    }
}