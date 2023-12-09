package com.freshkite.todo.repository;

import org.springframework.context.annotation.Scope;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import com.freshkite.todo.model.Todomodel;

@Component
@Scope()
public interface Todorepo extends MongoRepository<Todomodel, String> {

    
} 
