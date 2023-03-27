import React, { useState, useEffect, useMemo, useRef } from "react";
import TaskDataService from "../services/TaskService";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import { DropdownFilter, DefaultFilterForColumn } from "../Filter";

const TasksList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tasksRef = useRef();

  tasksRef.current = tasks;

  useEffect(() => {
    retrieveTasks();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
  };

  const removeAllTasks = () => {
    TaskDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TaskDataService.findByTitle(searchTitle)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTask = (rowIndex) => {
    const id = tasksRef.current[rowIndex].id;
    props.history.push("/tasks/" + id);
  };

  const deleteTask = (rowIndex) => {
    const id = tasksRef.current[rowIndex].id;

    TaskDataService.remove(id)
      .then((response) => {
        props.history.push("/tasks");

        let newTasks = [...tasksRef.current];
        newTasks.splice(rowIndex, 1);

        setTasks(newTasks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        disableFilters: true,
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
      },
      {
        Header: "Complete",
        accessor: "complete",
        disableSortBy: true,
        Filter: DropdownFilter,
        Cell: (props) => {
          return props.value ? "True" : "False";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        disableSortBy: true,
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTask(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTask(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: tasks,
        defaultColumn: { Filter: DefaultFilterForColumn },
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <h2>Task Manager</h2>
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTasks}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TasksList;
