import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-gray-200">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;