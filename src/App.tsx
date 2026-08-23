import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Outreach from "./pages/Outreach";
import Tasks from "./pages/Tasks";
import FamilyEngagement from "./pages/FamilyEngagement";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/outreach"
          element={<Outreach />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/family-engagement"
          element={<FamilyEngagement />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;