package com.freshkite.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.freshkite.todo.model.Todomodel;
import com.freshkite.todo.repository.Todorepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin
public class Todocontroller {
    @Autowired
    private Todorepo trepo;

    @GetMapping("/todos")
    public List<Todomodel> getTodo() {
        System.out.println("Get todos");
        return trepo.findAll();
    }

    @PostMapping("/todos")
    public Todomodel postTodo(@RequestBody Todomodel entity) {
        //TODO: process POST request
        System.out.println("PostTodo:" + entity);
        return trepo.save(entity);
    }
    
    @PutMapping("/todos/{id}")
    public Todomodel updateTodo(@PathVariable String id, @RequestBody Todomodel entity) {
        //TODO: process PUT request
        Todomodel oldEntity = trepo.findById(id).get();
        System.out.println("Puttodo:" + entity);
        oldEntity.setTitle(entity.getTitle());
        oldEntity.setDescription(entity.getDescription());
               
        return trepo.save(oldEntity);
    }

    @DeleteMapping("/todos/{id}")
    public String deleteTodo(@PathVariable String id) {
        System.out.println("Delete:" + id);

        trepo.deleteById(id);
        return id;
    }
}
