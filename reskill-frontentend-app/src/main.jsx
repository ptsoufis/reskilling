// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './Home'; // Import the Home component
import SinglePost from './SinglePost'; 
import './index.css'; 
import './styles.css'; 
import '@fortawesome/fontawesome-free/css/all.css'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/post/:id" element={<SinglePost />} /> 
      </Routes>
    </Router>
  </StrictMode>,
);
