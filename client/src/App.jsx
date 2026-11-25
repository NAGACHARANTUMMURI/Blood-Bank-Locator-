import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RoleSelection from './pages/auth/RoleSelection';
import HospitalDashboard from './pages/dashboards/HospitalDashboard';
import BloodBankDashboard from './pages/dashboards/BloodBankDashboard';
import DonorDashboard from './pages/dashboards/DonorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import BloodBankLocator from './pages/BloodBankLocator';
import BloodInventory from './pages/BloodInventory';
import CreateBloodRequest from './pages/CreateBloodRequest';
import EmergencyRequests from './pages/EmergencyRequests';
import DispatcherTracking from './pages/DispatcherTracking';
import DonorManagement from './pages/DonorManagement';
import ContactUs from './pages/ContactUs';
import DeveloperTeam from './pages/DeveloperTeam';

import Layout from './layouts/Layout';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blood-banks" element={<BloodBankLocator />} />
          <Route path="inventory" element={<BloodInventory />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="team" element={<DeveloperTeam />} />

          <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="register" element={!user ? <Register /> : <Navigate to="/role" />} />
          <Route path="role" element={!user ? <RoleSelection /> : <Navigate to="/dashboard" />} />

          <Route path="dashboard" element={
            <PrivateRoute>
              <RoleRoute roles={['hospital']}>
                <HospitalDashboard />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="dashboard/bloodbank" element={
            <PrivateRoute>
              <RoleRoute roles={['bloodbank']}>
                <BloodBankDashboard />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="dashboard/donor" element={
            <PrivateRoute>
              <RoleRoute roles={['donor']}>
                <DonorDashboard />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="dashboard/admin" element={
            <PrivateRoute>
              <RoleRoute roles={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="request/create" element={
            <PrivateRoute>
              <RoleRoute roles={['hospital']}>
                <CreateBloodRequest />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="requests" element={
            <PrivateRoute>
              <RoleRoute roles={['hospital', 'admin']}>
                <EmergencyRequests />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="tracking/:requestId" element={
            <PrivateRoute>
              <RoleRoute roles={['hospital', 'admin']}>
                <DispatcherTracking />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="donor-management" element={
            <PrivateRoute>
              <RoleRoute roles={['bloodbank', 'admin']}>
                <DonorManagement />
              </RoleRoute>
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;