package com.freshkite.todo.exception;

public class TodoNotFound extends RuntimeException {
    public TodoNotFound(String message) {
        super(message);
    }
}
