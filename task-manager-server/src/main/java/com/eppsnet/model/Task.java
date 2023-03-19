package com.eppsnet.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tutorials")
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

    public Task(final String title, final LocalDate dueDate, final boolean complete) {
        this.title = title;
        this.dueDate = dueDate;
        this.complete = complete;
    }

    public long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public LocalDate getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(final LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(final boolean complete) {
        this.complete = complete;
    }

    @Override
    public String toString() {
        return "Task [id=" + id + ", title=" + title + ", dueDate=" + dueDate + ", complete=" + complete + "]";
    }
}
