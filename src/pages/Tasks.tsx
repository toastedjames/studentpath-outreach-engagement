import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  User,
  CheckCircle2,
  Circle,
  Clock3,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { tasks as initialTasks } from "../data/mockData";

import type {
  Priority,
  Task,
  TaskStatus,
} from "../types";

function Tasks() {
  const [taskList, setTaskList] =
    useState<Task[]>(initialTasks);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [title, setTitle] = useState("");
  const [studentName, setStudentName] =
    useState("");

  const [priority, setPriority] =
    useState<Priority>("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("Graduate Assistant");

  const filteredTasks = useMemo(() => {
    return taskList.filter((task) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.studentName
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    taskList,
    searchTerm,
    statusFilter,
    priorityFilter,
  ]);

  const resetForm = () => {
    setTitle("");
    setStudentName("");
    setPriority("Medium");
    setDueDate("");
    setAssignedTo("Graduate Assistant");
  };

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleCreateTask = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim() || !dueDate) {
      return;
    }

    const formattedDate = new Date(
      `${dueDate}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      studentName:
        studentName.trim() || undefined,
      priority,
      dueDate: formattedDate,
      status: "To Do",
      assignedTo,
    };

    setTaskList((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);

    closeModal();
  };

  const updateTaskStatus = (
    taskId: number,
    newStatus: TaskStatus
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const getStatusIcon = (
    status: TaskStatus
  ) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={19} />;

      case "In Progress":
        return <Clock3 size={19} />;

      default:
        return <Circle size={19} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-content">
          <section className="page-heading">
            <div>
              <h2>Tasks</h2>

              <p>
                Manage follow-ups, student support,
                and administrative responsibilities.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() =>
                setIsModalOpen(true)
              }
            >
              <Plus size={18} />
              Create Task
            </button>
          </section>

          <section className="task-summary-grid">
            <div className="task-summary-card">
              <span>To Do</span>

              <strong>
                {
                  taskList.filter(
                    (task) =>
                      task.status === "To Do"
                  ).length
                }
              </strong>
            </div>

            <div className="task-summary-card">
              <span>In Progress</span>

              <strong>
                {
                  taskList.filter(
                    (task) =>
                      task.status === "In Progress"
                  ).length
                }
              </strong>
            </div>

            <div className="task-summary-card">
              <span>Completed</span>

              <strong>
                {
                  taskList.filter(
                    (task) =>
                      task.status === "Completed"
                  ).length
                }
              </strong>
            </div>
          </section>

          <section className="filters-card">
            <div className="student-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search tasks or students..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Statuses
              </option>

              <option value="To Do">
                To Do
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Priorities
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>
          </section>

          <section className="tasks-list">
            {filteredTasks.map((task) => (
              <article
                className="task-card"
                key={task.id}
              >
                <div
                  className={`task-status-icon ${task.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {getStatusIcon(task.status)}
                </div>

                <div className="task-card-main">
                  <div className="task-card-top">
                    <div>
                      <div className="task-title-row">
                        <h3>{task.title}</h3>

                        <span
                          className={`priority-badge ${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {task.studentName && (
                        <p>
                          Student: {task.studentName}
                        </p>
                      )}
                    </div>

                    <select
                      className="task-status-select"
                      value={task.status}
                      onChange={(event) =>
                        updateTaskStatus(
                          task.id,
                          event.target
                            .value as TaskStatus
                        )
                      }
                    >
                      <option value="To Do">
                        To Do
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </div>

                  <div className="task-card-meta">
                    <span>
                      <CalendarDays size={15} />
                      Due {task.dueDate}
                    </span>

                    <span>
                      <User size={15} />
                      {task.assignedTo}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {filteredTasks.length === 0 && (
              <div className="empty-state">
                No tasks found.
              </div>
            )}
          </section>
        </div>
      </main>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="outreach-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>Create Task</h2>

                <p>
                  Add a follow-up, student support,
                  or administrative task.
                </p>
              </div>

              <button
                className="modal-close-button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleCreateTask}
            >
              <div className="form-group">
                <label htmlFor="taskTitle">
                  Task Title
                </label>

                <input
                  id="taskTitle"
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskStudent">
                  Student
                  <span className="optional-label">
                    Optional
                  </span>
                </label>

                <input
                  id="taskStudent"
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(event) =>
                    setStudentName(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="taskPriority">
                    Priority
                  </label>

                  <select
                    id="taskPriority"
                    value={priority}
                    onChange={(event) =>
                      setPriority(
                        event.target
                          .value as Priority
                      )
                    }
                  >
                    <option value="High">
                      High
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Low">
                      Low
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="taskDueDate">
                    Due Date
                  </label>

                  <input
                    id="taskDueDate"
                    type="date"
                    value={dueDate}
                    onChange={(event) =>
                      setDueDate(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="assignedTo">
                  Assigned To
                </label>

                <select
                  id="assignedTo"
                  value={assignedTo}
                  onChange={(event) =>
                    setAssignedTo(
                      event.target.value
                    )
                  }
                >
                  <option>
                    Graduate Assistant
                  </option>

                  <option>
                    Program Advisor
                  </option>

                  <option>
                    Program Coordinator
                  </option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;