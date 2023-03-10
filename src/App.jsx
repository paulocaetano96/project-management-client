// ---------------------------------------------------- package imports
import { Routes, Route } from 'react-router-dom';
// ---------------------------------------------------- CSS imports
import './App.css'
// ---------------------------------------------------- component imports
import Home from './pages/Home';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import NavConsole from './components/NavConsole';
function App() {

  return (
    <div className="App">
      <NavConsole />
      
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

    </div>
  )
}

export default App
