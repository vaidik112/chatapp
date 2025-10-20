import express from "express";
import { protectRoute } from "../middleware/auth";
import { getmessages, getUsersForSidebar } from "../controllers/Messagecontroller";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUsersForSidebar);
messageRouter.get("/:id",protectRoute,getmessages);