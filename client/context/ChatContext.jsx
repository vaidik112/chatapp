// import { useState } from "react";
// import { useContext } from "react";
// import { Children } from "react";
// import { createContext } from "react";
// import { AuthContext } from "./Authcontext";
// import toast from "react-hot-toast";
// import { useEffect } from "react";


// export const ChatContext = createContext();

// export const ChatProvider = ({Children})=>{
//     const [messages,setMessages] = useState([]);
//     const [users,setUsers] = useState([]);
//     const [selecteduser,setSelectedUser] = useState(null);
//     const [unseenMessages,setunseenMessages] = useState({});
   
//    const {socket,axios} = useContext(AuthContext);
   
//     const  getUsers = async () =>{
//         try {
//            const {data} =  await axios.get("/api/messages/users");
//            if(data.success)
//            {
//               setUsers(data.users);
//               setunseenMessages(data.unseenMessages);
//            }
//         } catch (error) {
//              toast.error(error.message);
//         }
//     }
//     // function to get messages for selected user
//     const getMessages = async(userId)=>{
//         try {
//             const {data} = await axios.get(`/api/messages/${userId}`);
//           if(data.success)
//           {
//             setMessages(data.messages);
//           }
        
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }
//     // function to send message to selected user
//     const sendMessage = async (messageData) =>{
//          try {
//             const {data}  = await axios.post(`/api/messages/send/${selecteduser._id}`,messageData);
//             if(data.success)
//             {
//                setMessages((prevMessages)=>[...prevMessages,data.newMessage]);

//             }
//             else
//             {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(data.message);
//          }
//     }

//     // function to subscribe to messages for selected user 
//     const subscribeToMessages = async ()=>{
//         if(!socket)
//             return;
//         socket.on("newMessage",(newMessage)=>{
//                if(selecteduser && newMessage.senderId === selecteduser._id)
//                {
//                   newMessage.seen = true;
//                   setMessages((prevMessages)=>[...prevMessages,newMessage]);
//                   axios.put(`/api/messages/mark/${newMessage._id}`);
//                }
//                else{
//                      setunseenMessages((prevUnseenMessages)=>({
//                         ...prevUnseenMessages,[newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1:
//                         1
//                      }))
//                }
//         })
//     }

//     // function to unsubscribe from messages
//     const unsubscribeFromMessages = () =>{
//         if(socket)
//             socket.off("newMessage");
//     }
//      useEffect(()=>{
//           subscribeToMessages();
//           return ()=> unsubscribeFromMessages();
//      },[socket,selecteduser])
//     const value = {
//         messages,users,selecteduser,getUsers,setMessages,sendMessage,setSelectedUser,unseenMessages,setunseenMessages
//     }
//     return (
//         <ChatContext.Provider value={value}>
//         {Children}
//     </ChatContext.Provider>
//     )
// }
import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./Authcontext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selecteduser, setSelectedUser] = useState(null);
  const [unseenMessages, setunseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setunseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(`/api/messages/send/${selecteduser._id}`, messageData);
      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selecteduser && newMessage.senderId === selecteduser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setunseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selecteduser]);

  const value = {
    messages,
    users,
    selecteduser,
    getUsers,
    setMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setunseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
