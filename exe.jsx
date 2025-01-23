import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Layout from './components/Layout';  // Assurez-vous que ce composant existe
import PatientDashboard from './pages/patient/Dashboard';
import ProfessionalDashboard from './pages/professional/Dashboard';

// Landing page component
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-12">
        <Activity className="w-12 h-12 text-indigo-600 mr-4" />
        <h1 className="text-4xl font-bold text-gray-900">Plateforme de Santé Numérique</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Pour les Patients</h2>
          <ul className="space-y-2">
            <li>✓ Gestion de votre dossier médical</li>
            <li>✓ Prise de rendez-vous en ligne</li>
            <li>✓ Téléchargement de documents</li>
            <li>✓ Paiement sécurisé</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Pour les Professionnels</h2>
          <ul className="space-y-2">
            <li>✓ Gestion des patients</li>
            <li>✓ Planning des consultations</li>
            <li>✓ Accès aux dossiers médicaux</li>
            <li>✓ Système de notification</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Placeholder components for other routes
const PatientProfile = () => <div>Profile Patient</div>;
const PatientAppointments = () => <div>Rendez-vous Patient</div>;
const PatientDocuments = () => <div>Documents Patient</div>;
const PatientNotifications = () => <div>Notifications Patient</div>;

const ProfessionalProfile = () => <div>Profile Professionnel</div>;
const ProfessionalPatients = () => <div>Mes Patients</div>;
const ProfessionalSchedule = () => <div>Planning</div>;
const ProfessionalConsultations = () => <div>Consultations</div>;
const ProfessionalNotifications = () => <div>Notifications Professionnel</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Patient Routes */}
        <Route path="/patient" element={<Layout userType="patient" />}>
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="documents" element={<PatientDocuments />} />
          <Route path="notifications" element={<PatientNotifications />} />
        </Route>

        {/* Professional Routes */}
        <Route path="/professional" element={<Layout userType="professional" />}>
          <Route index element={<Navigate to="/professional/dashboard" replace />} />
          <Route path="dashboard" element={<ProfessionalDashboard />} />
          <Route path="profile" element={<ProfessionalProfile />} />
          <Route path="patients" element={<ProfessionalPatients />} />
          <Route path="schedule" element={<ProfessionalSchedule />} />
          <Route path="consultations" element={<ProfessionalConsultations />} />
          <Route path="notifications" element={<ProfessionalNotifications />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
