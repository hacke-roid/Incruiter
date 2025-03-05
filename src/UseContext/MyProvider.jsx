import { createContext, useState } from "react";

export let MyContext = createContext()

export const MyProvider = ({children}) => {
    let token = localStorage.getItem('token')
    const [userDetails, setUserDetails] = useState({})
    const [jwtToken, setJwtToken] = useState(token)

    return (
        <MyContext.Provider value={{}}>
            {children}
        </MyContext.Provider>
    )
}