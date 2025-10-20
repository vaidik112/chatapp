import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getmessages, getUsersForSidebar, markmessageasseen, sendMessage } from "../controllers/Messagecontroller.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUsersForSidebar);
messageRouter.get("/:id",protectRoute,getmessages);
messageRouter.put('mark/:id',protectRoute,markmessageasseen);
messageRouter.post("/send/:id",protectRoute,sendMessage);
export default messageRouter;
