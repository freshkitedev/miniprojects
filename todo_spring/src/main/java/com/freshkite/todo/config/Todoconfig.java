package com.freshkite.todo.config;

import com.freshkite.todo.dal.*;
import com.freshkite.todo.dal.jpa.DBTodoRepo;
import com.freshkite.todo.dal.jpa.EntityManagerRepo;
import com.freshkite.todo.dal.jpa.PostgresTodoRep;
import com.freshkite.todo.dal.jpa.TodorepoJpa;
import com.freshkite.todo.dal.mongo.MongoTodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class Todoconfig {
    @Value("${storage}")
    private String data;

    @Autowired
    private MongoTodoRepo mongoTodoRepo;

    @Autowired
    private InMemoryTodoRepo memoryTodoRepo;

    @Autowired
    private DBTodoRepo dbTodoRepo;


    @Bean(name = "todoRepo")
    @Scope("prototype")
    public Todorepo todoRepo(InMemoryTodoRepo inMemoryTodoRepo) {
        //System.out.println("Data:" + data);
        if ("mongo".equals(data)) {
            System.out.println("MongoDb:" + data);
            return mongoTodoRepo; // Use MongoTodoRepo if data is "Database"
        } else if ("inmemory".equals(data)) {
            System.out.println("inMemory:" + data);
            return memoryTodoRepo; // Use MongoTodoRepo if data is "Database"
        }
        System.out.println("Db todo repo:" + data);
        return dbTodoRepo;
    }


}