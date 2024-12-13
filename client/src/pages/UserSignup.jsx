import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { user, setUser } = React.useContext(UserDataContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const newUser= {
      fullname: {
        firstName: firstname,
        lastName: lastname,
      },
      email: email,
      password: password
    }

    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    
    if (res.status === 201) {
      console.log('User created successfully')
      const data = res.data
      setUser(data.user)
      navigate('/home')
    }
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }


  return (
    <div className='login-container p-7 h-screen flex flex-col justify-between'>
      <div>
        <h3 className=' text-3xl mb-8 font-black'>DropMe</h3>

        <form onSubmit={submitHandler} action="">

          <h3 className='text-lg font-medium mb-2'> What's your name User?</h3>
          <div className='flex gap-4'>
            <input
              type="text"
              placeholder='First Name'
              className='bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              id="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />

            <input
              type="text"
              placeholder='Last Name'
              className='bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              id="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required />
          </div>

          <h3 className='text-lg font-medium mb-2'> What's your email User?</h3>
          <input
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            id="email"
            required />

          <h3 className='text-lg font-medium mb-2'> Enter password </h3>
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            id="password"
            required />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          > Signup </button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Sign in</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default UserSignup