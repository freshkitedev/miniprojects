package com.freshkite.todo.dal;

import com.freshkite.todo.model.Todomodel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Component
public class InMemoryTodoRepo implements Todorepo {
    HashMap <String, Todomodel> todoMap;

    InMemoryTodoRepo() {
        System.out.println("InMemoryCons");
        todoMap = new HashMap<>();
    }

    private String generateNewId() {
        return String.valueOf(todoMap.size() + 198765456);
    }

    public List<Todomodel> getAllTodos() {
        ArrayList<Todomodel> arrayList = new ArrayList<>(todoMap.values());
        return arrayList;
    }

    public Todomodel createTodo(Todomodel todo) {
        if (todo.getId() == null || todo.getId().isEmpty()) {
            todo.setId(generateNewId());
        }
        todoMap.put(todo.getId(), todo);
        return todo;
    }

    public Todomodel updateTodo(Todomodel todo_entry, String id) {
        todoMap.remove(id);
        todoMap.put(id, todo_entry);
        return todo_entry;
    }

    public String deleteTodo(String id) {
        todoMap.remove(id);
        return id;
    }

    public Optional<Todomodel> getTodoById(String id) {
        return null;
    }

}
