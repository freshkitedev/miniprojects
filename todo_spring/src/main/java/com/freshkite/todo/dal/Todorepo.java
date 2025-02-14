package com.freshkite.todo.dal;

import com.freshkite.todo.model.Todomodel;

import java.util.List;
import java.util.Optional;


public interface Todorepo {
    public List<Todomodel> getAllTodos();
    public Todomodel createTodo(Todomodel todo_entry);
    public Optional<Todomodel> updateTodo(Todomodel todo_entry, String id);
    public String deleteTodo(String id);
    Optional<Todomodel> getTodoById(String id);

}
