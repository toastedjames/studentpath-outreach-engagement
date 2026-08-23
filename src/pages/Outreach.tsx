import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  CalendarDays,
  MessageSquare,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  outreachRecords as initialOutreachRecords,
} from "../data/mockData";

import type {
  OutreachMethod,
  OutreachRecord,
  OutreachStatus,
} from "../types";

function Outreach() {
  const [records, setRecords] = useState<OutreachRecord[]>(
    initialOutreachRecords
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [program, setProgram] = useState<
    "Upward Bound" | "Talent Search"
  >("Upward Bound");

  const [method, setMethod] =
    useState<OutreachMethod>("Email");

  const [subject, setSubject] = useState("");
  const [status, setStatus] =
    useState<OutreachStatus>("Completed");

  const [followUpDate, setFollowUpDate] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.studentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.subject
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesMethod =
        methodFilter === "All" ||
        record.method === methodFilter;

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return (
        matchesSearch &&
        matchesMethod &&
        matchesStatus
      );
    });
  }, [
    records,
    searchTerm,
    methodFilter,
    statusFilter,
  ]);

  const getMethodIcon = (recordMethod: OutreachMethod) => {
    switch (recordMethod) {
      case "Email":
        return <Mail size={18} />;

      case "Phone":
        return <Phone size={18} />;

      case "Meeting":
        return <CalendarDays size={18} />;

      case "Text":
        return <MessageSquare size={18} />;

      default:
        return <MessageSquare size={18} />;
    }
  };

  const resetForm = () => {
    setStudentName("");
    setProgram("Upward Bound");
    setMethod("Email");
    setSubject("");
    setStatus("Completed");
    setFollowUpDate("");
  };

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!studentName.trim() || !subject.trim()) {
      return;
    }

    const newRecord: OutreachRecord = {
      id: Date.now(),
      studentName: studentName.trim(),
      program,
      method,
      subject: subject.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status,
      followUpDate: followUpDate || undefined,
    };

    setRecords((currentRecords) => [
      newRecord,
      ...currentRecords,
    ]);

    closeModal();
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-content">
          <section className="page-heading">
            <div>
              <h2>Student Outreach</h2>

              <p>
                Track communication, follow-ups, and
                student engagement.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} />
              Log Outreach
            </button>
          </section>

          <section className="filters-card">
            <div className="student-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search student or subject..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            <select
              value={methodFilter}
              onChange={(event) =>
                setMethodFilter(event.target.value)
              }
            >
              <option value="All">All Methods</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Meeting">Meeting</option>
              <option value="Text">Text</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Awaiting Response">
                Awaiting Response
              </option>
              <option value="Follow-Up Due">
                Follow-Up Due
              </option>
              <option value="Scheduled">
                Scheduled
              </option>
            </select>
          </section>

          <section className="outreach-list">
            {filteredRecords.map((record) => (
              <article
                className="outreach-record-card"
                key={record.id}
              >
                <div className="outreach-method-icon">
                  {getMethodIcon(record.method)}
                </div>

                <div className="outreach-record-main">
                  <div className="outreach-record-top">
                    <div>
                      <h3>{record.studentName}</h3>

                      <span className="program-label">
                        {record.program}
                      </span>
                    </div>

                    <span
                      className={`outreach-status ${record.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {record.status}
                    </span>
                  </div>

                  <h4>{record.subject}</h4>

                  <div className="outreach-record-meta">
                    <span>{record.method}</span>
                    <span>{record.date}</span>

                    {record.followUpDate && (
                      <span>
                        Follow-up: {record.followUpDate}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filteredRecords.length === 0 && (
              <div className="empty-state">
                No outreach records found.
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
                <h2>Log Outreach</h2>

                <p>
                  Record a student communication or
                  follow-up activity.
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

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentName">
                  Student Name
                </label>

                <input
                  id="studentName"
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(event) =>
                    setStudentName(event.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="program">
                    Program
                  </label>

                  <select
                    id="program"
                    value={program}
                    onChange={(event) =>
                      setProgram(
                        event.target.value as
                          | "Upward Bound"
                          | "Talent Search"
                      )
                    }
                  >
                    <option value="Upward Bound">
                      Upward Bound
                    </option>

                    <option value="Talent Search">
                      Talent Search
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="method">
                    Method
                  </label>

                  <select
                    id="method"
                    value={method}
                    onChange={(event) =>
                      setMethod(
                        event.target.value as OutreachMethod
                      )
                    }
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject / Purpose
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. College application follow-up"
                  value={subject}
                  onChange={(event) =>
                    setSubject(event.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">
                    Status
                  </label>

                  <select
                    id="status"
                    value={status}
                    onChange={(event) =>
                      setStatus(
                        event.target.value as OutreachStatus
                      )
                    }
                  >
                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Awaiting Response">
                      Awaiting Response
                    </option>

                    <option value="Follow-Up Due">
                      Follow-Up Due
                    </option>

                    <option value="Scheduled">
                      Scheduled
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="followUpDate">
                    Follow-Up Date
                  </label>

                  <input
                    id="followUpDate"
                    type="date"
                    value={followUpDate}
                    onChange={(event) =>
                      setFollowUpDate(event.target.value)
                    }
                  />
                </div>
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
                  Save Outreach
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Outreach;