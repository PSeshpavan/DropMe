import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const [showRetry, setShowRetry] = useState(false)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
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

export default UserProtectWrapper