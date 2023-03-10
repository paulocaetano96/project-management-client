import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import NavConsole from './components/NavConsole';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      
        <NavConsole />

    </div>
  )
}

export default App
