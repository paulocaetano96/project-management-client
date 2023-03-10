// ---------------------------------------------------- package imports
import { Routes, Route } from 'react-router-dom';
// ---------------------------------------------------- CSS imports
import './App.css'
// ---------------------------------------------------- component imports
import Home from './pages/Home';

function App() {

  return (
    <Routes>
				<Route path='/' element={<Home />} />
			</Routes>
  )
}

export default App
