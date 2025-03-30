package com.freshkite.todo.config;

import com.freshkite.todo.dal.jpa.EntityManagerRepo;
import com.freshkite.todo.dal.jpa.PostgresTodoRep;
import com.freshkite.todo.dal.jpa.SessionFactoryRepo;
import com.freshkite.todo.dal.jpa.TodorepoJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class Postgresconfig {

    @Value("${storage}")
    private String data;

    @Autowired
    private PostgresTodoRep postgresTodoRep;

    @Autowired
    private EntityManagerRepo entityManagerRepo;

    @Autowired
    private SessionFactoryRepo sessionFactoryRepo;

    @Bean(name = "todoRepoJPA")
    @Scope("prototype")
    public TodorepoJpa getJPAObject(EntityManagerRepo erepo) {
        //System.out.println("Data:" + data);
        if ("entity".equals(data)) {
            System.out.println("Entity:" + data);
            return entityManagerRepo; // Use MongoTodoRepo if data is "Database"
        } else if ("jpa".equals(data)) {
            System.out.println("JPA:" + data);
            return postgresTodoRep; // Use MongoTodoRepo if data is "Database"
        }
        System.out.println("Session:" + data);
        return sessionFactoryRepo;
    }
}
