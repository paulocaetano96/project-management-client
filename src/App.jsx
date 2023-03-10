// ---------------------------------------------------- package imports
import { Routes, Route } from 'react-router-dom';
// ---------------------------------------------------- CSS imports
import './App.css'
// ---------------------------------------------------- component imports
import Home from './pages/Home';
import NavConsole from './components/NavConsole';
import Signup from './pages/Signup';
import { useState } from 'react';

import './App.css';


function App() {

  return (
    <div className="App">
      <NavConsole />
      
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>

    </div>
  )
}

export default App
