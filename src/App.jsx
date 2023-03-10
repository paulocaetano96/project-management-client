// ---------------------------------------------------- package imports
import { Routes, Route } from 'react-router-dom';
// ---------------------------------------------------- CSS imports
import './App.css'
// ---------------------------------------------------- component imports
import NavConsole from './components/NavConsole';
import Signup from './pages/Signup';
import { useState } from 'react';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NavConsole from './components/NavConsole';


import './App.css';


function App() {
  return (
    <div className="App">
      <NavConsole />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />

      </Routes>
    </div>
  )
}
export default App
