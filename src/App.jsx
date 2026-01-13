// App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SeekerDashboard from './Pages/BloodSeekerDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import DonorDashboard from './Pages/DonorDashboard';
import PrivacyPolicy from './Pages/PrivacyPolicy';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;