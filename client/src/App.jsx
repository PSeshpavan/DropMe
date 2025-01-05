import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Start from './pages/Start'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/captainLogin'
import UserProtectWrapper from './pages/UserProtectWrapper'
import Home from './pages/Home'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />

        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />


        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App