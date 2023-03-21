package com.eppsnet.repository;

import com.eppsnet.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByComplete(boolean complete);

    List<Task> findByTitleContaining(String title);
}
