import React, { createContext, useState } from 'react'
import ProfileUrl from "../assets/Profile.jpeg";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
  const [loading, setloading] = useState(false)

  const user = {
    _id: "safn,nje5fa56",
    username: "Krishan Das",
    email: "krishan8974783135@gmail.com",
    role: "admin",
    avatar: {
      url: ProfileUrl,
    },
    bio: `Computer Science & Engineering student passionate about building
              modern web applications and solving real-world problems.

              Currently focusing on building production-ready projects while
              improving my Backend Development, MERN Stack, Flutter,
              Data Structures & Algorithms, and exploring AI/ML.`

  }

  return (
    <AuthContext.Provider value = {{user, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;