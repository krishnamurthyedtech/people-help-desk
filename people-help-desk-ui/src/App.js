
import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HelpForm from './components/HelpForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CommentsPage from './components/CommentPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
    
  useEffect(() => {
    document.title = 'People Help Desk';
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
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        setSelectedCategory={setSelectedCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Content selectedCategory={selectedCategory} />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/help" element={<HelpForm />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dashboard/comments/:inquiryId/:userId" element={<CommentsPage />} />
      </Routes>
      <Footer showForm={false} />
      
          </Router>
  );
}

export default App;
