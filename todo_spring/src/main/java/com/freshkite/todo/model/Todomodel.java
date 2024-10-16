package com.freshkite.todo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "todo")
@Data // Lombok annotation to generate getters, setters, toString, equals, hashCode, etc.
@NoArgsConstructor // Generates the no-argument constructor
@AllArgsConstructor // Generates the constructor with all arguments
public class Todomodel {

    @Id
    private String id;
    private String title;
    private String description;
}