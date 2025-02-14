package com.freshkite.todo.dal.mongo;

import com.freshkite.todo.dal.Todorepo;
import com.freshkite.todo.model.Todomodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Primary
public class MongoTodoRepo implements Todorepo {
    @Autowired
    private Mrepo mrepo;

    public List<Todomodel> getAllTodos() {
        System.out.println("Get repo: ");
        return mrepo.findAll();
    }

    public Todomodel createTodo(Todomodel todo_entry) {
        return mrepo.save(todo_entry);
    }

    public Optional<Todomodel> updateTodo(Todomodel todo_entry, String id) {
        Optional <Todomodel> optionTodo = mrepo.findById(id);
        if (optionTodo.isPresent()) {
            Todomodel oldEntry = optionTodo.get();
            oldEntry.setTitle(todo_entry.getTitle());
            oldEntry.setDescription(todo_entry.getDescription());
            return Optional.of(mrepo.save(oldEntry));
        }
        return Optional.empty();
    }

    public String deleteTodo(String id) {
        mrepo.deleteById(id);
        return "Deleted Successfully";
    }

    @Override
    public Optional<Todomodel> getTodoById(String id) {
        return Optional.empty();
    }
}