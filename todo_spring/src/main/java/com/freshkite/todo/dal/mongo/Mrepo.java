package com.freshkite.todo.dal.mongo;

import com.freshkite.todo.model.Todomodel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Mrepo extends MongoRepository<Todomodel, String> {

}
