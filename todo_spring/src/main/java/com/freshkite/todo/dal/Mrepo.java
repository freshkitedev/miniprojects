package com.freshkite.todo.dal;

import com.freshkite.todo.model.Todomodel;
import org.springframework.context.annotation.Scope;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface Mrepo extends MongoRepository<Todomodel, String> {

}
