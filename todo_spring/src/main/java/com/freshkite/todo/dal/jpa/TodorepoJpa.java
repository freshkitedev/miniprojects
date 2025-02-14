package com.freshkite.todo.dal.jpa;

import com.freshkite.todo.model.TodomodelJpa;

import java.util.List;
import java.util.Optional;

public interface TodorepoJpa {
    public List<TodomodelJpa> getAllTodos();
    public TodomodelJpa createTodo(TodomodelJpa todo_entry);
    public Optional<TodomodelJpa> updateTodo(TodomodelJpa todo_entry, String id);
    public String deleteTodo(String id);
    Optional<TodomodelJpa> getTodoById(String id);
}
