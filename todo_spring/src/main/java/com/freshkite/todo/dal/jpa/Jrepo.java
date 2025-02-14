package com.freshkite.todo.dal.jpa;

import com.freshkite.todo.model.TodomodelJpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Jrepo extends JpaRepository<TodomodelJpa, String> {
}
