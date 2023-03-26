package com.eppsnet.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "complete")
    private boolean complete;


    public Task() {
    }

    public Task(String title, LocalDate dueDate, boolean complete) {
        this.title = title;
        this.dueDate = dueDate;
        this.complete = complete;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

    @Override
    public String toString() {
        return "Task [id=" + id + ", title=" + title + ", dueDate=" + dueDate + ", complete=" + complete + "]";
    }
}
