import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import AdminPanel from './admin/AdminPanel';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  </Router>
);

export default App;
