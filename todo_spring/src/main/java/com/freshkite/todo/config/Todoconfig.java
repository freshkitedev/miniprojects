package com.freshkite.todo.config;

import com.freshkite.todo.dal.InMemoryTodoRepo;
import com.freshkite.todo.dal.MongoTodoRepo;
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

    @Bean(name = "todoRepo")
    public Todorepo todoRepo() {
        //System.out.println("Data:" + data);
        if ("Database".equals(data)) {
            System.out.println("Data inside:" + data);
            return mongoTodoRepo; // Use MongoTodoRepo if data is "Database"
        }
        return memoryTodoRepo;
    }
}
