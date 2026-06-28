import { createContext, useContext, useState, useEffect } from "react";
import {refreshToken} from "../api/authApi.js"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  const [loading, setLoading] = useState(true); 

  // --- page refresh ---
  useEffect(() => {
    const silentRefresh = async () => {
      try {
       
        const response = await refreshToken();
        
        setAccessToken(response.data.accessToken); 
        setUser(response.data.user);
        
      } catch (error) {
        console.log("Session expired or no refresh token found");
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false); 
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
      {!loading ? children : (
        <div className="flex h-screen items-center justify-center bg-slate-950 text-white font-sans">
          <p className="animate-pulse text-indigo-400 text-sm tracking-wider">
            SYNCING SESSION...
          </p>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}