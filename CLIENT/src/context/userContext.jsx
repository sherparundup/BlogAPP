import React, { createContext, useState } from 'react'

export const userContext =createContext({})

export const UserConntextProvider=({children})=>{
    const[userInfo,setUserinfo]=useState({});
    return (
        <userContext.Provider value={{userInfo,setUserinfo}}>
            {children}

        </userContext.Provider>
    )
} 