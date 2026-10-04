package com.UNGraduado.backend.util;

public class Stack<T> {
    private Object[] elements;
    private int size;
    private int capacity;

    public Stack() {
        this.capacity = 4;
        this.elements = new Object[capacity];
        this.size = 0;
    }

    public Stack(int capacity) {
        this.capacity = capacity;
        this.elements = new Object[capacity];
        this.size = 0;
    }

    private void resize() {
        capacity = capacity * 2;
        Object[] newElements = new Object[capacity];
        
        for (int i = 0; i < size; i++) {
            newElements[i] = elements[i];
        }
        
        this.elements = newElements;
    }

    public void push(T element) {
        if (size == capacity) {
            resize();
        }
        elements[size] = element;
        size++;
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        if (isEmpty()) {
            throw new IllegalStateException("La pila está vacía");
        }
        size--;
        T element = (T) elements[size];
        elements[size] = null;
        return element;
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("La pila está vacía");
        }
        return (T) elements[size - 1];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}