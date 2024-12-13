import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home bg-cover bg-center bg-[url("/Landing.jpeg")] h-screen flex justify-between flex-col w-full pt-7'>
        {/* <img src="" alt="landing-page" className='w-full h-full object-start' /> */}
        <h3 className='ml-7 object-start text-4xl font-black'>DropMe</h3>
        <div className='home-container bg-white pb-8 py-4 px-4'>
            <h2 className='text-[28px] font-semibold'>Get Started with DropMe</h2>
            <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
    </div>
  )
}

export default Home