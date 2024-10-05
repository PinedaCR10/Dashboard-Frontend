import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import App from './App.tsx';
import Home from './pages/Home.tsx';  
import Dashboards from './pages/Dashboard.tsx'; 
import Graficos from './pages/Graficos.tsx';  
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
);
