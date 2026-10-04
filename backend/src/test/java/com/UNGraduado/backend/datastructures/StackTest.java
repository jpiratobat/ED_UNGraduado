package com.UNGraduado.backend.datastructures;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StackTest {

    private Stack<String> pila;

    @BeforeEach
    void setUp() {
        pila = new Stack<>();
    }

    @Test
    void testPilaIniciaVacia() {
        assertTrue(pila.isEmpty());
        assertEquals(0, pila.size());
    }

    @Test
    void testPushYPeek() {
        pila.push("Cálculo I");
        pila.push("Programación I");

        assertFalse(pila.isEmpty());
        assertEquals(2, pila.size());
        assertEquals("Programación I", pila.peek());
        assertEquals(2, pila.size());
    }

    @Test
    void testPopCumpleLIFO() {
        pila.push("Primer Elemento");
        pila.push("Segundo Elemento");
        pila.push("Tercer Elemento");

        assertEquals("Tercer Elemento", pila.pop());
        assertEquals("Segundo Elemento", pila.pop());
        assertEquals(1, pila.size());
        assertEquals("Primer Elemento", pila.peek());
    }

    @Test
    void testRedimensionamientoDinamico() {
        pila.push("Elem 1");
        pila.push("Elem 2");
        pila.push("Elem 3");
        pila.push("Elem 4");
        pila.push("Elem 5");

        assertEquals(5, pila.size());
        assertEquals("Elem 5", pila.peek());
    }

    @Test
    void testPopEnPilaVaciaLanzaExcepcion() {
        Exception exception = assertThrows(IllegalStateException.class, () -> {
            pila.pop();
        });

        assertEquals("La pila está vacía", exception.getMessage());
    }

    @Test
    void testPeekEnPilaVaciaLanzaExcepcion() {
        assertThrows(IllegalStateException.class, () -> {
            pila.peek();
        });
    }
}