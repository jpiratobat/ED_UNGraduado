package com.UNGraduado.backend;

import com.UNGraduado.backend.datastructures.queue.MyQueueArrayList;

public class TestMyQueueArrayList {
    public static void main(String[] args) {
        System.out.println("=== PRUEBA INDEPENDIENTE: MYQUEUEARRAYLIST ===");
        
        int[] tamanios = {1000, 5000, 10000, 50000, 100000};

        for (int n : tamanios) {
            
            MyQueueArrayList<Integer> cola = new MyQueueArrayList<>(n);
            
            long inicio = System.nanoTime();
            
           
            for (int i = 0; i < n; i++) {
                cola.enqueue(i);
            }
            
            
            for (int i = 0; i < n; i++) {
                try {
                    cola.dequeue();
                } catch (Exception e) {
                    System.out.println("Error inesperado en la cola: " + e.getMessage());
                }
            }
            
            long fin = System.nanoTime();
            double msTotal = (fin - inicio) / 1_000_000.0;
            
            System.out.printf("Elementos: %6d | Tiempo Total (Enqueue + Dequeue): %8.3f ms%n", n, msTotal);
        }
    }
}
