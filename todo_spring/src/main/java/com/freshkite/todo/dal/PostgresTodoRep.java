package com.freshkite.todo.dal;

import com.freshkite.todo.model.Todomodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class PostgresTodoRep implements Todorepo{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<Todomodel> rowMapper = new RowMapper<>() {

        public Todomodel mapRow(ResultSet rs, int rowNum) throws SQLException {
            Todomodel todo = new Todomodel();
            todo.setId(String.valueOf(rs.getLong("id")));
            todo.setTitle(rs.getString("title"));
            todo.setDescription(rs.getString("description"));
            return todo;
        }
    };

    @Override
    public List<Todomodel> getAllTodos() {
        return jdbcTemplate.query("SELECT * FROM \"todo\"", rowMapper);
    }

    public Optional<Todomodel> getTodoById(String id) {
        String querySql = "SELECT * FROM \"todo\" WHERE id = ?";
        List<Todomodel> results = jdbcTemplate.query(querySql, rowMapper, Long.parseLong(id));
        return results.stream().findFirst();
    }

    @Override
    public Todomodel createTodo(Todomodel todo) {
        String insertSql = "INSERT INTO todo (title, description) VALUES (?, ?) RETURNING id";
        Long newId = jdbcTemplate.queryForObject(insertSql, new Object[]{todo.getTitle(), todo.getDescription()}, Long.class);
        todo.setId(String.valueOf(newId));
        return todo;
    }


    public Todomodel updateTodo(Todomodel todo, String id) {
        String updateSql = "UPDATE \"todo\" SET title = ?, description = ? WHERE id = ?";
        jdbcTemplate.update(updateSql, todo.getTitle(), todo.getDescription(), Long.parseLong(id));
        return getTodoById(id).orElse(null);
    }



    public String deleteTodo(String id) {
        jdbcTemplate.update("DELETE FROM \"todo\" WHERE id = ?", Long.parseLong(id));
        return "Deleted";
    }

}
