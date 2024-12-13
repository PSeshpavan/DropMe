import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Start from './pages/Start'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/captainLogin'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App