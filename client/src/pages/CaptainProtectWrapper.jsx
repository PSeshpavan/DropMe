import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const [showRetry, setShowRetry] = useState(false)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {
                localStorage.removeItem('token')
                navigate('/captain-login')
            })

        const timer = setTimeout(() => {
            setShowRetry(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [token])

    if (isLoading) {
        return (
            <div>
                {showRetry ? (
                    <p>Sorry, something went wrong. Please <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => window.location.reload()}>try again</span>.</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper