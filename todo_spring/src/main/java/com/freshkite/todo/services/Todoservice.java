package com.freshkite.todo.services;

import com.freshkite.todo.dal.Todorepo;
import com.freshkite.todo.dal.jpa.TodorepoJpa;
import com.freshkite.todo.exception.TodoNotFound;
import com.freshkite.todo.model.Todomodel;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class Todoservice {
    Todorepo repo;

    @Autowired
    public Todoservice(@Qualifier("todoRepo") Todorepo repo) {
        this.repo = repo;
        System.out.println("Service constructor: ");
    }

    public List<Todomodel> getTodoService() {
        System.out.println("Service get:");
        return repo.getAllTodos();
    }

    public Todomodel createTodoService(Todomodel todoEntry) {
        return repo.createTodo(todoEntry);
    }

    public Optional<Todomodel> updateTodoService(Todomodel todoEntry, String id) {
        Optional<Todomodel> optionTodo = repo.updateTodo(todoEntry, id);
        if (optionTodo.isEmpty()) {
            throw new TodoNotFound("Todo is not found id is " + id);
        }
        return optionTodo;
    }

    public String deleteTodoService(String id) {
        return repo.deleteTodo(id);
    }
}
