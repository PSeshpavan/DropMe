import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/captainLogin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
      </Routes>
    </div>
  )
}

export default App