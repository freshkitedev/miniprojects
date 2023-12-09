package com.todo.todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface Todorepo extends MongoRepository<Todomodel,String> {
    
}
