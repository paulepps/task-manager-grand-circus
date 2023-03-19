import React, { useState } from "react";
import TaskDataService from "../services/TaskService";

const AddTask = () => {
  const initialTaskState = {
    id: null,
    title: "",
    dueDate: "",
    complete: false
  };
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    var data = {
      title: task.title,
      dueDate: task.dueDate
    };

    TaskDataService.create(data)
      .then(response => {
        setTask({
          id: response.data.id,
          title: response.data.title,
          dueDate: response.data.dueDate,
          complete: response.data.complete
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  return (
<div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={task.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              required
              value={task.dueDate}
              onChange={handleInputChange}
              name="dueDate"
            />
          </div>

          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>  );
};

export default AddTask;