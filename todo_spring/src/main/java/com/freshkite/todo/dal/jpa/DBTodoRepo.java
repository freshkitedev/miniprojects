package com.freshkite.todo.dal.jpa;

import com.freshkite.todo.dal.Todorepo;
import com.freshkite.todo.dal.mongo.Mrepo;
import com.freshkite.todo.model.Todomodel;
import com.freshkite.todo.model.TodomodelJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Primary
public class DBTodoRepo implements Todorepo {

    private TodorepoJpa trepojpa;

    @Autowired
    public DBTodoRepo(@Qualifier("todoRepoJPA") TodorepoJpa repo) {
        this.trepojpa = repo;
        System.out.println("DBTodoRepo constructor: ");
    }

    public List<Todomodel> convertToTodoModelList(List<TodomodelJpa> jpaList) {
        return jpaList.stream()
                .map(todo -> new Todomodel(todo.getId(), todo.getTitle(), todo.getDescription()))
                .collect(Collectors.toList());
    }

    public static Todomodel convertToTodoModel(TodomodelJpa jpaTodo) {
        return new Todomodel(jpaTodo.getId(), jpaTodo.getTitle(), jpaTodo.getDescription());
    }

    public static TodomodelJpa convertToTodoModelJpa(Todomodel jpaTodo) {
        return new TodomodelJpa(jpaTodo.getId(), jpaTodo.getTitle(), jpaTodo.getDescription());
    }

    public static Optional<TodomodelJpa> convertToTodoModelJpaOptional(Optional<Todomodel> optionalTodo) {
        return optionalTodo.map(todo -> new TodomodelJpa(todo.getId(), todo.getTitle(), todo.getDescription()));
    }

    public static Optional<Todomodel> convertToTodoModelOptional(Optional<TodomodelJpa> optionalTodo) {
        return optionalTodo.map(todo -> new Todomodel(todo.getId(), todo.getTitle(), todo.getDescription()));
    }

    public List<Todomodel> getAllTodos() {
        return convertToTodoModelList(trepojpa.getAllTodos());
    }

    public Todomodel createTodo(Todomodel todo_entry) {
        TodomodelJpa todo;
        todo = trepojpa.createTodo(convertToTodoModelJpa(todo_entry));
        return convertToTodoModel(todo);
    }

    public Optional<Todomodel> updateTodo(Todomodel todo_entry, String id) {
        Optional <TodomodelJpa> optionTodo;
        optionTodo = trepojpa.updateTodo(convertToTodoModelJpa(todo_entry), id);
        return convertToTodoModelOptional(optionTodo);
    }

    public String deleteTodo(String id) {
        trepojpa.deleteTodo(id);
        return "Deleted Successfully";
    }

    @Override
    public Optional<Todomodel> getTodoById(String id) {
        return Optional.empty();
    }
}