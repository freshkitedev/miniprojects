package com.freshkite.todo.dal;

import com.freshkite.todo.model.Todomodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    public Todomodel updateTodo(Todomodel todo_entry, String id) {
        Todomodel oldEntry = mrepo.findById(id).get();
        oldEntry.setTitle(todo_entry.getTitle());
        oldEntry.setDescription(todo_entry.getDescription());
        return mrepo.save(oldEntry);
    }

    public String deleteTodo(String id) {
        mrepo.deleteById(id);
        return "Deleted Successfully";
    }
}