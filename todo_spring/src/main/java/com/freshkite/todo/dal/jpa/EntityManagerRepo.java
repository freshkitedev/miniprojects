package com.freshkite.todo.dal.jpa;
import com.freshkite.todo.dal.jpa.TodorepoJpa;
import com.freshkite.todo.model.TodomodelJpa;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class EntityManagerRepo implements TodorepoJpa {
    @PersistenceContext
    private EntityManager entityManager;

    public List<TodomodelJpa> getAllTodos() {
        System.out.println("Get EM");
        return entityManager.createQuery("SELECT t FROM TodomodelJpa t", TodomodelJpa.class).getResultList();
    }

    public Optional<TodomodelJpa> getTodoById(String id) {
        return Optional.ofNullable(entityManager.find(TodomodelJpa.class, id));
    }


    @Transactional
    public TodomodelJpa createTodo(TodomodelJpa todo) {
        try {
            todo.setId(UUID.randomUUID().toString()); // Generate unique String ID
            System.out.println("DAL create todo:" + todo);
            entityManager.persist(todo);
            System.out.println("After DAL create todo:" + todo);
            return todo;
        } catch (PersistenceException e) {
            System.err.println("Error persisting todo: " + e.getMessage());
            e.printStackTrace();
            throw e; // Re-throw the exception to return a 500 error
        }
    }

    public Optional<TodomodelJpa> updateTodo(TodomodelJpa updatedTodo, String id) {
        TodomodelJpa existingTodo = entityManager.find(TodomodelJpa.class, id);
        if (existingTodo != null) {
            existingTodo.setTitle(updatedTodo.getTitle());
            existingTodo.setDescription(updatedTodo.getDescription());
            entityManager.merge(existingTodo);
            return Optional.of(existingTodo);
        }
        return Optional.empty();
    }

    public String deleteTodo(String id) {
        TodomodelJpa todo = entityManager.find(TodomodelJpa.class, id);
        if (todo != null) {
            entityManager.remove(todo);
            return "Deleted";
        }
        return "Todo not found";
    }
}