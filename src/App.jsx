// ---------------------------------------------------- package imports
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// ---------------------------------------------------- CSS imports
import './App.css'
// ---------------------------------------------------- component imports
import NavConsole from './components/NavConsole';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Club from './pages/Club';
import Documents from './pages/Documents';

function App() {
  return (
    <div className="App">
      <NavConsole />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/club/:id' element={<Club />} />
        <Route path='/documents' element={<Documents />} />
      </Routes>
    </div>
  )
}
export default App
