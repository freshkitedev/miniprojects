package com.freshkite.todo.dal.jpa;

import com.freshkite.todo.model.TodomodelJpa;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SessionFactoryRepo implements TodorepoJpa {

    private final SessionFactory sessionFactory;

    @Autowired
    public SessionFactoryRepo(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<TodomodelJpa> getAllTodos() {
        System.out.println("Get all todo session factory");
        try (Session session = sessionFactory.openSession()) {
            return session.createQuery("FROM TodomodelJpa", TodomodelJpa.class).list();
        }
    }

    @Override
    public TodomodelJpa createTodo(TodomodelJpa todo_entry) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            todo_entry.setId(UUID.randomUUID().toString()); // Generate unique String ID
            System.out.println("Session create todo:" + todo_entry);
            session.persist(todo_entry);
            transaction.commit();
            return todo_entry;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            throw e;
        }
    }

    @Override
    public Optional<TodomodelJpa> updateTodo(TodomodelJpa todo_entry, String id) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            TodomodelJpa existingTodo = session.get(TodomodelJpa.class, id);
            if (existingTodo != null) {
                existingTodo.setTitle(todo_entry.getTitle());
                existingTodo.setDescription(todo_entry.getDescription());
                session.merge(existingTodo);
                System.out.println("Session Update todo:" + existingTodo);
                transaction.commit();
                return Optional.of(existingTodo);
            }
            return Optional.empty();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            throw e;
        }
    }

    @Override
    public String deleteTodo(String id) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            TodomodelJpa todo = session.get(TodomodelJpa.class, id);
            if (todo != null) {
                session.delete(todo);
                System.out.println("Delete todo:" + todo);
                transaction.commit();
                return "Deleted successfully";
            }
            return "Todo not found";
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            throw e;
        }
    }

    @Override
    public Optional<TodomodelJpa> getTodoById(String id) {
        try (Session session = sessionFactory.openSession()) {
            return Optional.ofNullable(session.get(TodomodelJpa.class, id));
        }
    }
}
