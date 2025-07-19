import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import EmployeeDetail from './pages/EmployeeDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="employee/:id" element={<EmployeeDetail />} />
      </Route>
    </Routes>
  );
}

export default App;