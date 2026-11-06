package com.UNGraduado.backend.datastructures.queue;

public class MyQueueUnderFlowException extends Exception {
    public MyQueueUnderFlowException(String message) {
        super(message);
    }
}