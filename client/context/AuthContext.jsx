// import { createContext, useEffect, useState } from "react";
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import {io} from 'socket.io-client';

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export const AuthContext = createContext();
// axios.defaults.baseURL = backendUrl;
// export const AuthProvider = ({children}) =>{
//       const [token, setToken] = useState(localStorage.getItem("token"));
//       const [authUser,setauthUser] = useState(null);
//       const [onlineUsers,setonlineUsers] = useState([]);
//       const [socket,setSocket] = useState(null);
//       // check if the user is authenticated and if so set user data and connect the socket
//       const checkAuth = async () =>{
//        try {
//               // const {data} = await axios.get("/api/auth/check");
//               // if(data.success)
//               // {
//               //   setauthUser(data.user);
//               //   connectSocket(data.user);
//               // }
//                const {data} = await axios.get("/api/auth/check", {
//   headers: {
//     token: localStorage.getItem("token")
//   }
// });


//        } catch (error) {
//           toast.error(error.message);
//        }
              
//       }
//     // login function to handle user authentication and socket connection

//     const login = async (state, credentials) =>{
//            try {
//               const {data}  =  await axios.post(`/api/auth/${state}`,credentials);
//               if(data.success)
//               {
//                 axios.defaults.headers.common["token"] = data.token;
//                 setauthUser(data.userData);
//                 connectSocket(data.userData);
//                 setToken(data.token);
//                 localStorage.setItem("token",data.token);
//                 toast.success(data.message);
//               }
//               else{
//                 toast.error(error.message); 
//               }
//            } catch (error) {
//                 toast.error(error.message); 
//            }
//     }
// // Logout function to handle user logout and socket disconnection
//    const logout = async () =>{
//     localStorage.removeItem("token");
//     setToken(null);
//     setauthUser(null);
//     setonlineUsers([]);
//     axios.defaults.headers.common["token"] = null;
//     toast.success("Logged out successfully");
//     socket.disconnect();
//    }



//       // connect socket function to handle socket connection
//       const connectSocket = (userData) =>{
//           if(!userData || socket?.connected) return;
//          const newSocket = io(backendUrl,
//           {
//             query: {
//               userId: userData._id,
//             }
//           }
//          );
//          newSocket.connect();
//          setSocket(newSocket);
//          newSocket.on("getOnlineUsers",(userIds)=>{
//            setonlineUsers(userIds);
//          })
//       }
// // update profile function to handle user profile updates

// const updateProfile = async (body) =>{
//      try {
//              const {data} = await axios.put("/api/auth/update-profile",body);
//              if(data.success)
//              {
//               setauthUser(data.user);
//               toast.success("Profile updated succe3eessfully")
//              }
//      } catch (error) {
//          toast.error(error.message);
//      }
// }




//         useEffect(()=>{
//           if(token)
//           {
//             axios.defaults.headers.common["token"] = token;
//           }
//           checkAuth();

//         },[token])
//       const value = {
//             axios,
//             authUser,
//             onlineUsers,
//             socket,
//             login,
//             logout,
//       }

//       return (
//         <AuthContext.Provider value={value}>
//              {children}
//         </AuthContext.Provider>
//       )
// }
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AuthContext = createContext();

axios.defaults.baseURL = backendUrl;

// 👇 Interceptor to attach token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
    console.log("✅ Sending token header:", token.slice(0, 25) + "..."); // debug
  } else {
    console.log("⚠️ No token found in localStorage");
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setauthUser] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      console.log("🔍 checkAuth response:", data);
      if (data.success) {
        setauthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("checkAuth error:", error);
    }
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
     if (data.success) {
  setauthUser(data.userData);
  connectSocket(data.userData);
  setToken(data.token);
  localStorage.setItem("token", data.token);  // must save here
  axios.defaults.headers.common["token"] = data.token;
  toast.success(data.message);
} else {
  toast.error(data.message);
}
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setauthUser(null);
    setonlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    socket?.disconnect();
  };

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => setonlineUsers(userIds));
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setauthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

useEffect(() => {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    setToken(localToken);
    axios.defaults.headers.common["token"] = localToken;
    checkAuth();
  } else {
    console.log("⚠️ No token in localStorage on mount");
  }
}, []);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
