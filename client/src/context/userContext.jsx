import React, { createContext } from 'react'

export const UserDataContext = createContext()


const userContext = ({ children }) => {

    const [user, setUser] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
        password: '',
    })

    return (
        <UserDataContext.Provider value={{}}>
            <div>{children}</div>
        </UserDataContext.Provider>
    )
}

export default userContext