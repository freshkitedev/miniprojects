package com.freshkite.todo.dal.jpa;

import com.freshkite.todo.dal.Todorepo;
import com.freshkite.todo.dal.mongo.Mrepo;
import com.freshkite.todo.model.Todomodel;
import com.freshkite.todo.model.TodomodelJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Primary
public class DBTodoRepo implements Todorepo {
    @Autowired
    private PostgresTodoRep jrepo;

    @Autowired
    private EntityManagerRepo erepo;

    @Value("${storage}")
    private String data;

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
        System.out.println("Get repo: ");
        if (data.equalsIgnoreCase("entity")) {
            return convertToTodoModelList(erepo.getAllTodos());
        }
        return convertToTodoModelList(jrepo.getAllTodos());
    }

    public Todomodel createTodo(Todomodel todo_entry) {
        TodomodelJpa todo;
        if (data.equalsIgnoreCase("entity")) {
            System.out.println("Entity:" + todo_entry);
            todo = erepo.createTodo(convertToTodoModelJpa(todo_entry));
        } else {
            System.out.println("JPA:" + todo_entry);
            todo = jrepo.createTodo(convertToTodoModelJpa(todo_entry));
        }
        System.out.println("End:" + todo);
        return convertToTodoModel(todo);
    }

    public Optional<Todomodel> updateTodo(Todomodel todo_entry, String id) {
        Optional <TodomodelJpa> optionTodo;
        if (data.equalsIgnoreCase("entity")) {
            optionTodo = erepo.updateTodo(convertToTodoModelJpa(todo_entry), id);
        } else {
            optionTodo = jrepo.updateTodo(convertToTodoModelJpa(todo_entry), id);
        }

        return convertToTodoModelOptional(optionTodo);
    }

    public String deleteTodo(String id) {
        if (data.equalsIgnoreCase("entity")) {
            erepo.deleteTodo(id);
        } else {
            jrepo.deleteTodo(id);
        }
        return "Deleted Successfully";
    }

    @Override
    public Optional<Todomodel> getTodoById(String id) {
        return Optional.empty();
    }
}