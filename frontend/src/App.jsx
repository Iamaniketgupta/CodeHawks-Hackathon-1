
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard/Dashboard'
import { getCurrentUser } from './utils/user.data.fetch'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/authSlice'
// import { navigate } from "gatsby";

function App() {
  const [dark, setDark] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true
  });

  const dispatch = useDispatch();
  const navigate =useNavigate()
  const currentURL = window.location.href;
  console.log(currentURL)

  async function getUser() {
    try {
      const data = await getCurrentUser();
      console.log(data.data);
  
      if (data) {
        const obj = {
          user: data.data
        };
        dispatch(login(obj));
        console.log(window.location.pathname)
  
        if (window.location.pathname === "/api/dashboard") {
          console.log("first")
          
        } else {
          navigate('/api/dashboard');
        }
      }
    } catch (error) {
      // Handle error if getCurrentUser fails
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
    // if(document.cookie.includes("accessToken")){
    //     getUser();
    // }
    
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
