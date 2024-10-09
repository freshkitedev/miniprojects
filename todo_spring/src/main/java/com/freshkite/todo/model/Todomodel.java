package com.freshkite.todo.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "todos")
public class Todomodel {
    private String _id;
    private String title;
    private String description;

    public Todomodel(String title, String description, String _id) {
        this.title = title;
        this.description = description;
        this._id = _id;
        System.out.println("todo model cons " + _id);
    }

    public String get_id() {
        System.out.println("get_id");
        return _id;
    }

    public void set_id(String _id) {
        System.out.println("set_id");
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Todomodel{" +
                "_id='" + _id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
