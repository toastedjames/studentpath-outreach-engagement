import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  CalendarDays,
  MessageSquare,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  familyEngagementRecords as initialRecords,
} from "../data/mockData";

import type {
  FamilyEngagementRecord,
  OutreachMethod,
} from "../types";

function FamilyEngagement() {
  const [records, setRecords] =
    useState<FamilyEngagementRecord[]>(
      initialRecords
    );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [followUpFilter, setFollowUpFilter] =
    useState("All");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [familyName, setFamilyName] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [method, setMethod] =
    useState<OutreachMethod>("Phone");

  const [purpose, setPurpose] =
    useState("");

  const [outcome, setOutcome] =
    useState("");

  const [followUpRequired, setFollowUpRequired] =
    useState(false);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        record.familyName
          .toLowerCase()
          .includes(search) ||
        record.studentName
          .toLowerCase()
          .includes(search) ||
        record.purpose
          .toLowerCase()
          .includes(search);

      const matchesFollowUp =
        followUpFilter === "All" ||
        (followUpFilter === "Required" &&
          record.followUpRequired) ||
        (followUpFilter === "Not Required" &&
          !record.followUpRequired);

      return (
        matchesSearch &&
        matchesFollowUp
      );
    });
  }, [
    records,
    searchTerm,
    followUpFilter,
  ]);

  const totalInteractions = records.length;

  const followUpsRequired = records.filter(
    (record) => record.followUpRequired
  ).length;

  const resolvedInteractions =
    totalInteractions - followUpsRequired;

  const getMethodIcon = (
    recordMethod: OutreachMethod
  ) => {
    switch (recordMethod) {
      case "Email":
        return <Mail size={18} />;

      case "Phone":
        return <Phone size={18} />;

      case "Meeting":
        return <CalendarDays size={18} />;

      case "Text":
        return <MessageSquare size={18} />;
    }
  };

  const resetForm = () => {
    setFamilyName("");
    setStudentName("");
    setMethod("Phone");
    setPurpose("");
    setOutcome("");
    setFollowUpRequired(false);
  };

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !familyName.trim() ||
      !studentName.trim() ||
      !purpose.trim() ||
      !outcome.trim()
    ) {
      return;
    }

    const newRecord: FamilyEngagementRecord = {
      id: Date.now(),
      familyName: familyName.trim(),
      studentName: studentName.trim(),
      method,
      date: new Date().toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),
      purpose: purpose.trim(),
      outcome: outcome.trim(),
      followUpRequired,
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
              <h2>Family Engagement</h2>

              <p>
                Track communication and engagement
                with students' families and guardians.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() =>
                setIsModalOpen(true)
              }
            >
              <Plus size={18} />
              Log Interaction
            </button>
          </section>

          <section className="family-summary-grid">
            <div className="family-summary-card">
              <div className="family-summary-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Total Interactions</span>
                <strong>{totalInteractions}</strong>
              </div>
            </div>

            <div className="family-summary-card">
              <div className="family-summary-icon warning">
                <AlertCircle size={22} />
              </div>

              <div>
                <span>Follow-Ups Required</span>
                <strong>{followUpsRequired}</strong>
              </div>
            </div>

            <div className="family-summary-card">
              <div className="family-summary-icon success">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <span>Resolved Interactions</span>
                <strong>{resolvedInteractions}</strong>
              </div>
            </div>
          </section>

          <section className="family-filters">
            <div className="student-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search family, student, or purpose..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />
            </div>

            <select
              value={followUpFilter}
              onChange={(event) =>
                setFollowUpFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Interactions
              </option>

              <option value="Required">
                Follow-Up Required
              </option>

              <option value="Not Required">
                No Follow-Up Required
              </option>
            </select>
          </section>

          <section className="family-records-list">
            {filteredRecords.map((record) => (
              <article
                className="family-record-card"
                key={record.id}
              >
                <div className="family-method-icon">
                  {getMethodIcon(record.method)}
                </div>

                <div className="family-record-main">
                  <div className="family-record-header">
                    <div>
                      <h3>
                        {record.familyName}
                      </h3>

                      <p>
                        Student:{" "}
                        {record.studentName}
                      </p>
                    </div>

                    <span className="family-record-date">
                      {record.date}
                    </span>
                  </div>

                  <div className="family-purpose">
                    <span>Purpose</span>

                    <p>{record.purpose}</p>
                  </div>

                  <div className="family-outcome">
                    <span>Outcome</span>

                    <p>{record.outcome}</p>
                  </div>

                  <div className="family-record-footer">
                    <span className="interaction-method">
                      {record.method}
                    </span>

                    {record.followUpRequired ? (
                      <span className="follow-up-required">
                        Follow-Up Required
                      </span>
                    ) : (
                      <span className="follow-up-complete">
                        No Follow-Up Required
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filteredRecords.length === 0 && (
              <div className="empty-state">
                No family engagement records found.
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
                <h2>Log Family Interaction</h2>

                <p>
                  Record communication with a parent
                  or guardian.
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
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="familyName">
                    Family Name
                  </label>

                  <input
                    id="familyName"
                    type="text"
                    placeholder="Enter family name"
                    value={familyName}
                    onChange={(event) =>
                      setFamilyName(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="familyStudent">
                    Student Name
                  </label>

                  <input
                    id="familyStudent"
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
              </div>

              <div className="form-group">
                <label htmlFor="familyMethod">
                  Communication Method
                </label>

                <select
                  id="familyMethod"
                  value={method}
                  onChange={(event) =>
                    setMethod(
                      event.target
                        .value as OutreachMethod
                    )
                  }
                >
                  <option value="Phone">
                    Phone
                  </option>

                  <option value="Email">
                    Email
                  </option>

                  <option value="Meeting">
                    Meeting
                  </option>

                  <option value="Text">
                    Text
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="purpose">
                  Purpose
                </label>

                <input
                  id="purpose"
                  type="text"
                  placeholder="Why did you contact the family?"
                  value={purpose}
                  onChange={(event) =>
                    setPurpose(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="outcome">
                  Outcome
                </label>

                <textarea
                  id="outcome"
                  placeholder="Describe the outcome of the interaction..."
                  value={outcome}
                  onChange={(event) =>
                    setOutcome(
                      event.target.value
                    )
                  }
                />
              </div>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={followUpRequired}
                  onChange={(event) =>
                    setFollowUpRequired(
                      event.target.checked
                    )
                  }
                />

                <span>
                  A follow-up is required for this
                  interaction
                </span>
              </label>

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
                  Save Interaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FamilyEngagement;