package com.freshkite.todo.services;

import com.freshkite.todo.dal.MongoTodoRepo;
import com.freshkite.todo.dal.Todorepo;
import com.freshkite.todo.model.Todomodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Todoservice {
    Todorepo repo;

    @Value("${storage}")
    String data;

//    Todoservice() {
////        if (data.equals("Database")) {
////            System.out.println("Service constructor");
////            repo = new MongoTodoRepo();
////        }
//        System.out.println("Service constructor:" + data);
//        repo = new MongoTodoRepo();
//    }
    @Autowired
    public Todoservice(Todorepo repo) {
        this.repo = repo;
        System.out.println("Service constructor: " + data);
    }

    public List<Todomodel> getTodoService() {
        System.out.println("Service get:" + data);
        return repo.getAllTodos();
    }

    public Todomodel createTodoService(Todomodel todoEntry) {
        return repo.createTodo(todoEntry);
    }

    public Todomodel updateTodoService(Todomodel todoEntry, String id) {
        return repo.updateTodo(todoEntry, id);
    }

    public String deleteTodoService(String id) {
        return repo.deleteTodo(id);
    }
}
