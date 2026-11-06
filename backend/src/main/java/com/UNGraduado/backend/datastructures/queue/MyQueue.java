package com.UNGraduado.backend.datastructures.queue;

public interface MyQueue<T> {
    public void enqueue(T item);
    public T dequeue() throws MyQueueUnderFlowException;
    public T front() throws MyQueueUnderFlowException;
    public boolean isEmpty();
    public int size();
}
