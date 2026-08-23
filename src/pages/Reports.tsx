import {
  BarChart3,
  Users,
  Mail,
  CheckCircle2,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  outreachRecords,
} from "../data/mockData";

function Reports() {
  const methodData = [
    { name: "Email", value: 42 },
    { name: "Phone", value: 28 },
    { name: "Meeting", value: 18 },
    { name: "Text", value: 31 },
  ];

  const programData = [
    {
      name: "Upward Bound",
      outreach: 64,
      followUps: 18,
    },
    {
      name: "Talent Search",
      outreach: 55,
      followUps: 14,
    },
  ];

  const statusData = [
    {
      name: "Completed",
      value: 68,
      color: "#16a34a",
    },
    {
      name: "Awaiting Response",
      value: 22,
      color: "#f59e0b",
    },
    {
      name: "Follow-Up Due",
      value: 17,
      color: "#dc2626",
    },
    {
      name: "Scheduled",
      value: 12,
      color: "#2563eb",
    },
  ];

  const totalOutreach = methodData.reduce(
    (total, item) => total + item.value,
    0
  );

  const completedOutreach =
    statusData.find(
      (item) => item.name === "Completed"
    )?.value || 0;

  const completionRate = Math.round(
    (completedOutreach / totalOutreach) * 100
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-content">
          <section className="page-heading">
            <div>
              <h2>Reports & Insights</h2>

              <p>
                Monitor outreach activity, student
                engagement, and program progress.
              </p>
            </div>

            <select className="report-period-select">
              <option>Current Semester</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Academic Year</option>
            </select>
          </section>

          {/* Metrics */}

          <section className="report-metrics-grid">
            <div className="report-metric-card">
              <div className="report-metric-icon">
                <BarChart3 size={22} />
              </div>

              <div>
                <span>Total Outreach</span>

                <strong>{totalOutreach}</strong>

                <p>
                  Across all communication methods
                </p>
              </div>
            </div>

            <div className="report-metric-card">
              <div className="report-metric-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Students Engaged</span>

                <strong>87</strong>

                <p>
                  Unique students reached
                </p>
              </div>
            </div>

            <div className="report-metric-card">
              <div className="report-metric-icon">
                <Mail size={22} />
              </div>

              <div>
                <span>Follow-Ups</span>

                <strong>32</strong>

                <p>
                  Requiring additional attention
                </p>
              </div>
            </div>

            <div className="report-metric-card">
              <div className="report-metric-icon success">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <span>Completion Rate</span>

                <strong>{completionRate}%</strong>

                <p>
                  Completed outreach activities
                </p>
              </div>
            </div>
          </section>

          {/* Top Charts */}

          <section className="reports-grid">
            {/* Outreach by Method */}

            <article className="report-chart-card">
              <div className="report-card-header">
                <div>
                  <h3>Outreach by Method</h3>

                  <p>
                    Communication activity by channel
                  </p>
                </div>
              </div>

              <div className="chart-container">
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart
                    data={methodData}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      name="Interactions"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Outreach Status */}

            <article className="report-chart-card">
              <div className="report-card-header">
                <div>
                  <h3>Outreach Status</h3>

                  <p>
                    Current communication progress
                  </p>
                </div>
              </div>

              <div className="chart-container">
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      label
                    >
                      {statusData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          {/* Program Comparison */}

          <section
            className="report-chart-card program-chart-card"
          >
            <div className="report-card-header">
              <div>
                <h3>
                  Program Engagement Comparison
                </h3>

                <p>
                  Compare outreach and follow-up
                  activity across VT TRIO programs.
                </p>
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <BarChart
                  data={programData}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="outreach"
                    name="Outreach"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />

                  <Bar
                    dataKey="followUps"
                    name="Follow-Ups"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Summary */}

          <section className="report-summary-card">
            <h3>Report Summary</h3>

            <p>
              The current data shows continued student
              engagement across both Talent Search and
              Upward Bound. Email remains the most
              frequently used communication channel,
              while phone and text outreach continue to
              support timely follow-ups.
            </p>

            <div className="report-summary-stats">
              <div>
                <strong>
                  {outreachRecords.length}
                </strong>

                <span>
                  Recent Outreach Records
                </span>
              </div>

              <div>
                <strong>
                  {completionRate}%
                </strong>

                <span>
                  Communication Completion
                </span>
              </div>

              <div>
                <strong>32</strong>

                <span>
                  Active Follow-Ups
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Reports;