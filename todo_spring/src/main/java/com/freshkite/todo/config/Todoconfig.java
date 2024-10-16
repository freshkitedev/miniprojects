package com.freshkite.todo.config;

import com.freshkite.todo.dal.InMemoryTodoRepo;
import com.freshkite.todo.dal.MongoTodoRepo;
import com.freshkite.todo.dal.PostgresTodoRep;
import com.freshkite.todo.dal.Todorepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class Todoconfig {
    @Value("${storage}")
    private String data;

    @Autowired
    private MongoTodoRepo mongoTodoRepo;

    @Autowired
    private InMemoryTodoRepo memoryTodoRepo;

   @Autowired
    private PostgresTodoRep postgresTodoRep;

    @Bean(name = "todoRepo")
    public Todorepo todoRepo(InMemoryTodoRepo inMemoryTodoRepo) {
        //System.out.println("Data:" + data);
        if ("mongo".equals(data)) {
            System.out.println("MongoDb:" + data);
            return mongoTodoRepo; // Use MongoTodoRepo if data is "Database"
        } else if ("inMemory".equals(data)) {
            System.out.println("InmemoryDB:" + data);
            return memoryTodoRepo;

        }
        return postgresTodoRep;
    }
}
