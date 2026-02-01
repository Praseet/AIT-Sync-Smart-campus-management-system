import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './modules/Dashboard';
import Hostel from './modules/Hostel';
import FacultyModule from './modules/Faculty';
import Maintenance from './modules/Maintenance';
import AlumniConnect from './modules/Alumni';
import Resources from './modules/Resources';
import Placements from './modules/Placements';
import Profile from './modules/Profile';
import AiAssistant from './modules/AiAssistant';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ai-chat" element={<AiAssistant />} />
          <Route path="hostel" element={<Hostel />} />
          <Route path="faculty" element={<FacultyModule />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="alumni" element={<AlumniConnect />} />
          <Route path="resources" element={<Resources />} />
          <Route path="placements" element={<Placements />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}