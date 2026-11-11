package com.UNGraduado.backend;

import com.UNGraduado.backend.datastructures.LinkedList;

public class TestLinkedList {
    public static void main(String[] args) {
        System.out.println("=== PRUEBA INDEPENDIENTE: LINKEDLIST ===");
        
        int[] tamanios = {1000, 5000, 10000, 20000};

        for (int n : tamanios) {
            LinkedList<Integer> lista = new LinkedList<>();
            
            
            long inicioPush = System.nanoTime();
            for (int i = 0; i < n; i++) {
                lista.pushBack(i);
            }
            long finPush = System.nanoTime();
            
            
            long inicioPop = System.nanoTime();
            for (int i = 0; i < n; i++) {
                lista.popBack();
            }
            long finPop = System.nanoTime();

            
            double msPush = (finPush - inicioPush) / 1_000_000.0;
            double msPop = (finPop - inicioPop) / 1_000_000.0;
            
            System.out.printf("Elementos: %6d | PushBack: %8.3f ms | PopBack: %8.3f ms%n", n, msPush, msPop);
        }
    }
}
