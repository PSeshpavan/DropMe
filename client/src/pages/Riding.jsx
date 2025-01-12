import React from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        console.log("Ride ended")
        navigate('/home')
    })


    return (
        <div className='h-screen'>
                        <div className='header fixed p-6 z-10 top-0 flex items-center justify-between w-screen'>
                        <h3 className=' text-3xl mb-8 font-black'>DropMe</h3>
                            <Link to='/home' className=' h-10 w-10 -mt-8 bg-white flex items-center justify-center rounded-full'>
                                <i className="text-lg font-medium ri-logout-box-r-line"></i>
                            </Link>
                        </div>
            <div className='h-1/2'>
                <LiveTracking />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>{ride?.captain.vehicle.carName}</p>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-1'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill -mt-4"></i>
                            <div>
                                {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                                <p className='text-md pt-4'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cost</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full bg-green-600 text-white font-semibold p-3 rounded-lg mb-4'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding