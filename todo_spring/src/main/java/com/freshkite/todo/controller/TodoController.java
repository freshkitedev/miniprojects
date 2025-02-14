package com.freshkite.todo.controller;

import com.freshkite.todo.model.Todomodel;
import com.freshkite.todo.services.Todoservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        System.out.println("Create route:" + todoEntry);
        return tservice.createTodoService(todoEntry);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<Todomodel> updateTodoController(@PathVariable String id, @RequestBody Todomodel todoEntry) {
        System.out.println("update route:" + todoEntry);
        Optional<Todomodel> updatedTodo = tservice.updateTodoService(todoEntry, id);
        return updatedTodo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/todo/{id}")
    public  String deleteTodoController(@PathVariable String id) {
        System.out.println("delete route:" + id);
        return tservice.deleteTodoService(id);
    }
}
