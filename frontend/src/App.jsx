
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const [dark, setDark] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  return (
    <div className={`relative w-screen font-sans h-screen overflow-x-hidden`}>
      <Header dark={dark} setDark={setDark} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/api/login' element={<Login />} />
        <Route path='/api/signup' element={<Signup />} />
        <Route path='/api/dashboard' element={<Dashboard />} />
      </Routes>

    </div>
  )
}

export default App
