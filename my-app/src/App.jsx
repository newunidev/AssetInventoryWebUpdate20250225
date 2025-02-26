// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import Machine from './components/Machine';
// import ScanDashboard from './components/ScanDashboard';
// import Login from './components/Login';
// import InventoryReport from './components/InventoryReport';
// import InventoryCountReport from './components/InventoryCountReport';
// import DashboardContent from './components/DashboardContent';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ✅ Login is loaded separately */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Login />} />

//         ✅ Dashboard layout applied only to dashboard routes
//         <Route path="/dashboard" element={<Dashboard><div className="dashboard-content">Welcome to Dashboard</div></Dashboard>} />
//         <Route path="/machine" element={<Dashboard><Machine /></Dashboard>} />
//         <Route path="/scans" element={<Dashboard><ScanDashboard /></Dashboard>} />
//         <Route path="/reports/inventoryreport" element={<Dashboard><InventoryReport /></Dashboard>} />
//         <Route path="/reports/inventorycountreport" element={<Dashboard><InventoryCountReport /></Dashboard>} />
//         <Route path="/dashboardcontent" element={<Dashboard><DashboardContent /></Dashboard>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Machine from "./components/Machine";
import ScanDashboard from "./components/ScanDashboard";
import Login from "./components/Login";
import InventoryReport from "./components/InventoryReport";
import InventoryCountReport from "./components/InventoryCountReport";
import DashboardContent from "./components/DashboardContent";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Import PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* 🔒 Private (Protected) Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard><div className="dashboard-content">Welcome to Dashboard</div></Dashboard></PrivateRoute>} />
        <Route path="/machine" element={<PrivateRoute><Dashboard><Machine /></Dashboard></PrivateRoute>} />
        <Route path="/scans" element={<PrivateRoute><Dashboard><ScanDashboard /></Dashboard></PrivateRoute>} />
        <Route path="/reports/inventoryreport" element={<PrivateRoute><Dashboard><InventoryReport /></Dashboard></PrivateRoute>} />
        <Route path="/reports/inventorycountreport" element={<PrivateRoute><Dashboard><InventoryCountReport /></Dashboard></PrivateRoute>} />
        <Route path="/dashboardcontent" element={<PrivateRoute><Dashboard><DashboardContent /></Dashboard></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
