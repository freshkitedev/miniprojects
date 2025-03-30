package com.freshkite.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.freshkite.todo.dal.jpa")  // JPA Repositories
@EnableMongoRepositories(basePackages = "com.freshkite.todo.dal.mongo")  // MongoDB Repositories
public class 	TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

}
