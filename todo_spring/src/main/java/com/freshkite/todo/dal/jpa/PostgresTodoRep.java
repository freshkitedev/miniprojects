package com.freshkite.todo.dal.jpa;

import com.freshkite.todo.model.TodomodelJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PostgresTodoRep implements TodorepoJpa {
    @Autowired
    private Jrepo todoRepository;

    public List<TodomodelJpa> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<TodomodelJpa> getTodoById(String id) {
        return todoRepository.findById(id);
    }

    public TodomodelJpa createTodo(TodomodelJpa todo) {
        return todoRepository.save(todo);
    }

    public Optional<TodomodelJpa> updateTodo(TodomodelJpa updatedTodo, String id) {
        /*
        Optional<TodomodelJpa> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            TodomodelJpa todo = optionalTodo.get();
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            return Optional.of(todoRepository.save(todo));
        }
        return Optional.empty();
        */

        return todoRepository.findById(id).map(todo -> {
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            return todoRepository.save(todo);
        });
    }

    public String deleteTodo(String id) {
        todoRepository.deleteById(id);
        return "Deleted";
    }
}
