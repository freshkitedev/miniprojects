package com.todo.todo;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin
public class TodoController {
    
    @Autowired
    private Todorepo trepo;

    //@RequestMapping(value = "/todo", method=RequestMethod.GET)
    @GetMapping("/todos")
    public List<Todomodel> getTodos() {
        System.out.println("Get Todos");
        return trepo.findAll();
    }

    @PostMapping("/todos")
    public Todomodel postTodos(@RequestBody Todomodel todo) {
        System.out.println("Post Todos" + todo);
        return trepo.save(todo);
    }

    @PutMapping("/todos/{id}")
    public Todomodel puttodos(@PathVariable String id, @RequestBody Todomodel todo) {
        //TODO: process PUT request
        Todomodel oldTodo = trepo.findById(id).get();
        oldTodo.setTitle(todo.getTitle());
        oldTodo.setDescription(todo.getDescription());
        System.out.println("Update:" + todo);
        return trepo.save(oldTodo);
    }

    @DeleteMapping("/todos/{id}")
    public String deleteTodo(@PathVariable String id){
        //TODO: process PUT request
        System.out.println("Delete:" + id);
        trepo.deleteById(id);
        return id;
    }
}
