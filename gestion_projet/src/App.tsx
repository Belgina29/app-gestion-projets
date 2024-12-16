import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Categories from './components/categories';
import Projects from './components/projects';
import { useState } from 'react';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
