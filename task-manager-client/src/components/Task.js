import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";

const Task = (props) => {
  const initialTaskState = {
    id: null,
    title: "",
    dueDate: "",
    complete: false,
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = (id) => {
    TaskDataService.get(id)
      .then((response) => {
        setCurrentTask(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTask(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updateComplete = (status) => {
    var data = {
      id: currentTask.id,
      title: currentTask.title,
      dueDate: currentTask.dueDate,
      complete: status,
    };

    TaskDataService.update(currentTask.id, data)
      .then((response) => {
        setCurrentTask({ ...currentTask, complete: status });
        console.log(response.data);
        setMessage("Status was updated successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTask = () => {
    if (!currentTask.title || !currentTask.dueDate) {
      setMessage("All fields are required");
      return;
    }
    
    TaskDataService.update(currentTask.id, currentTask)
      .then((response) => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                required
                id="title"
                name="title"
                value={currentTask.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Description</label>
              <input
                type="date"
                required
                className="form-control"
                id="dueDate"
                name="dueDate"
                value={currentTask.dueDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Complete:&nbsp;</strong>
              </label>
              {currentTask.complete ? "True" : "False"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {currentTask.complete ? (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updateComplete(false)}
                >
                  Incomplete
                </button>
              ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updateComplete(true)}
                >
                  Complete
                </button>
              )}
            </div>
          </form>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Task;
