package com.freshkite.todo.controller;

import com.freshkite.todo.model.Todomodel;
import com.freshkite.todo.services.Todoservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    @Autowired
    Todoservice tservice;

    @GetMapping("/todo")
    public List<Todomodel> getTodoController() {
        System.out.println("Get route");
        return tservice.getTodoService();
    }

    @PostMapping("/todo")
    public  Todomodel createTodoController(@RequestBody Todomodel todoEntry) {
        return tservice.createTodoService(todoEntry);
    }

    @PutMapping("/todo/{id}")
    public Todomodel updateTodoController(@PathVariable String id, @RequestBody Todomodel todoEntry) {
        return tservice.updateTodoService(todoEntry, id);
    }

    @DeleteMapping("/todo/{id}")
    public  String deleteTodoController(@PathVariable String id) {
        return tservice.deleteTodoService(id);
    }
}
