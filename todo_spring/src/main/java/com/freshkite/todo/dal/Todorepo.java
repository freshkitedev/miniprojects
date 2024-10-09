package com.freshkite.todo.dal;

import com.freshkite.todo.model.Todomodel;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Repository
public interface Todorepo {
    public List<Todomodel> getAllTodos();
    public Todomodel createTodo(Todomodel todo_entry);
    public Todomodel updateTodo(Todomodel todo_entry, String id);
    public String deleteTodo(String id);
}
