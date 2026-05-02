import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SecurityDashboard from './pages/SecurityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The SIEM/SOAR engine is currently correlating events and orchestrating automated playbooks. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SecurityDashboard />} />
          <Route path="/alerts" element={<Placeholder name="Active Security Alerts" />} />
          <Route path="/cases" element={<Placeholder name="Incident Case Management" />} />
          <Route path="/playbooks" element={<Placeholder name="SOAR Playbook Orchestrator" />} />
          <Route path="/threats" element={<Placeholder name="Threat Intelligence Analytics" />} />
          <Route path="/rules" element={<Placeholder name="Detection & Correlation Rules" />} />
          <Route path="/audit" element={<Placeholder name="Response Audit Logs" />} />
          <Route path="/integrations" element={<Placeholder name="Platform Integrations Hub" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
