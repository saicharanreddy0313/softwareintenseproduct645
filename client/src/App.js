// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import PrivateRoute from './components/Privateroute';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Profile from './pages/Profile/Profile';
import Comparison from './components/Comparison.js/Comparison';
import Starred from './components/Starred/Starred'; // ✅ Added this line
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/comparison" element={<PrivateRoute><Comparison /></PrivateRoute>} />
          <Route path="/starred" element={<PrivateRoute><Starred /></PrivateRoute>} /> {/* ✅ Added this line */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
