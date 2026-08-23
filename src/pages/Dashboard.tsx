import { useNavigate } from "react-router-dom";

import {
  Clock,
  CheckCircle2,
  MessageSquare,
  CalendarDays,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import {
  outreachRecords,
  tasks,
} from "../data/mockData";

function Dashboard() {
  const navigate = useNavigate();

  const followUpsDue = outreachRecords.filter(
    (record) => record.status === "Follow-Up Due"
  ).length;

  const outreachCompleted = outreachRecords.filter(
    (record) => record.status === "Completed"
  ).length;

  const awaitingResponse = outreachRecords.filter(
    (record) => record.status === "Awaiting Response"
  ).length;

  const upcomingMeetings = outreachRecords.filter(
    (record) => record.method === "Meeting"
  ).length;

  const priorityTasks = tasks.filter(
    (task) =>
      task.priority === "High" &&
      task.status !== "Completed"
  );

  const recentOutreach = outreachRecords.slice(0, 5);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-content">
          <section className="page-heading">
            <div>
              <h2>Good morning</h2>

              <p>
                Here's an overview of your outreach
                activity and upcoming responsibilities.
              </p>
            </div>

            <div className="dashboard-date">
              August 22, 2026
            </div>
          </section>

          <section className="stats-grid">
            <StatCard
              title="Follow-Ups Due"
              value={followUpsDue}
              description="Students requiring action"
              icon={<Clock size={24} />}
            />

            <StatCard
              title="Outreach Completed"
              value={outreachCompleted}
              description="Completed communications"
              icon={<CheckCircle2 size={24} />}
            />

            <StatCard
              title="Awaiting Response"
              value={awaitingResponse}
              description="Pending student responses"
              icon={<MessageSquare size={24} />}
            />

            <StatCard
              title="Upcoming Meetings"
              value={upcomingMeetings}
              description="Scheduled student meetings"
              icon={<CalendarDays size={24} />}
            />
          </section>

          <section className="dashboard-grid">
            {/* Recent Outreach */}

            <div className="dashboard-card">
              <div className="card-header">
                <div>
                  <h2>Recent Outreach</h2>

                  <p>
                    Latest student communication activity
                  </p>
                </div>

                <button
                  className="view-all-button"
                  onClick={() => navigate("/outreach")}
                >
                  View All

                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="activity-list">
                {recentOutreach.map((record) => (
                  <div
                    className="activity-item"
                    key={record.id}
                  >
                    <div className="activity-avatar">
                      {record.studentName.charAt(0)}
                    </div>

                    <div className="activity-details">
                      <strong>
                        {record.studentName}
                      </strong>

                      <span>
                        {record.subject}
                      </span>
                    </div>

                    <div className="activity-meta">
                      <span className="activity-method">
                        {record.method}
                      </span>

                      <span
                        className={`outreach-status ${record.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Tasks */}

            <div className="dashboard-card priority-card">
              <div className="card-header">
                <div>
                  <h2>Priority Tasks</h2>

                  <p>
                    High-priority items requiring attention
                  </p>
                </div>

                <AlertCircle size={21} />
              </div>

              <div className="priority-task-list">
                {priorityTasks.map((task) => (
                  <div
                    className="priority-task"
                    key={task.id}
                  >
                    <div className="priority-task-top">
                      <span className="high-priority-badge">
                        High Priority
                      </span>

                      <span className="task-due-date">
                        Due {task.dueDate}
                      </span>
                    </div>

                    <h3>{task.title}</h3>

                    {task.studentName && (
                      <p>
                        Student: {task.studentName}
                      </p>
                    )}

                    <div className="task-assignment">
                      Assigned to {task.assignedTo}
                    </div>
                  </div>
                ))}

                {priorityTasks.length === 0 && (
                  <div className="empty-state">
                    No high-priority tasks right now.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Quick Actions */}

          <section className="quick-actions">
            <div className="quick-actions-header">
              <h2>Quick Actions</h2>

              <p>
                Common tasks for managing student outreach.
              </p>
            </div>

            <div className="quick-actions-grid">
              {/* Log Outreach */}

              <button
                className="quick-action-card"
                onClick={() => navigate("/outreach")}
              >
                <MessageSquare size={22} />

                <div>
                  <strong>Log Outreach</strong>

                  <span>
                    Record a new student communication
                  </span>
                </div>
              </button>

              {/* Schedule Meeting */}

              <button
                className="quick-action-card"
                onClick={() => navigate("/outreach")}
              >
                <CalendarDays size={22} />

                <div>
                  <strong>Schedule Meeting</strong>

                  <span>
                    Create a student or family meeting
                  </span>
                </div>
              </button>

              {/* Create Task */}

              <button
                className="quick-action-card"
                onClick={() => navigate("/tasks")}
              >
                <CheckCircle2 size={22} />

                <div>
                  <strong>Create Task</strong>

                  <span>
                    Add a new follow-up or administrative task
                  </span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;