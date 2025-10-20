import { createContext, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();
axios.defaults.baseURL = backendUrl;
export const AuthProvider = ({children}) =>{
      const [token, setToken] = useState(localStorage.getItem("token"));
      const [authUser,setauthUser] = useState(null);
      const [onlineUsers,setonlineUsers] = useState([]);
      const [socket,setSocket] = useState(null);
      // check if the user is authenticated and if so set user data and connect the socket
      const checkAuth = async () =>{
       try {
              const {data} = await axios.get("/api/auth/check");
              if(data.success)
              {
                setauthUser(data.user)
              }



       } catch (error) {
          toast.error(error.message);
       }

      }

      const value = {
            axios,
            authUser,
            onlineUsers,
            socket
      }

      return (
        <AuthContext.Provider value={value}>
             {children}
        </AuthContext.Provider>
      )
}