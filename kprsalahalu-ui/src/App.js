
import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CommentsPage from './components/CommentPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = 'KPR Salahalu';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'index.css';
    document.head.appendChild(link);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '../img/pc-logo.png';
    document.head.appendChild(favicon);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(favicon);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dashboard/comments/:inquiryId" element={<CommentsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
