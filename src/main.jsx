import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import CustomerList from './components/CustomerList.jsx';
import TrainingList from './components/TrainingList.jsx';
import TrainingCalendar from './components/Calendar.jsx';
import ActivityStats from './components/ActivityStats.jsx';

// Create root element
const root = createRoot(document.getElementById('root'));

// Render App component
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route index element={<CustomerList />} />
          <Route path="trainingList" element={<TrainingList />} />
          <Route path="calendar" element={<TrainingCalendar />} />
          <Route path="activityStats" element={<ActivityStats />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
