import { createContext, useContext, useState, useEffect } from "react";
import api from "../api.js"
import LoaderRK from "../components/Loader.jsx";
const AuthContext = createContext();



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  // --- page refresh ---
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        setIsLoading(true)
        const response = await api.post('/auth/refresh');
        
        setAccessToken(response.data?.accessToken); 
        setUser(response.data?.user);
        
      } catch (error) {
        console.log("Session expired or no refresh token found");
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false); 
      }
    };

    silentRefresh();
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
      }}
    >
      {
        isLoading && (
          <LoaderRK show={isLoading} message="Loading..." />
        )
      }

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}