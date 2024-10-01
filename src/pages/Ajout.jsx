import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import CreateGroup from './CreateGroup';
import SendInvitation from './SendInvitation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/send-invitation" element={<SendInvitation />} />
      </Routes>
    </Router>
  );
};

export default Ajout;
