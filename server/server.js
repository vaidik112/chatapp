import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/Messagerouter.js";
import { Server } from "socket.io";
// create express app and server
const app = express();
const server = http.createServer(app);
// initialize socket.io server
export const io = new Server(server,{
    cors:{origin:"*"}
})
// store online users
export const userSocketMap = {}; // {userid: socketId}
// socket.io handler
io.on("connection",(socket)=>{
       const userId = socket.handshake.query.userId;
       console.log("user Connected",userId);
       if(userId)
        userSocketMap[userId] = socket.id;
    // emit online users to all connected client
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnected",()=>{
        console.log("user disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})


// middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());
// Routes setup 
app.use("/api/status",(req,res)=>
res.send("server is live")
)
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("server is running on " + PORT);
});

 