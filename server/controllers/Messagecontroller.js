import User from "../lib/models/user.js";
import Message from "../lib/models/message.js";

// get all users except logged in user
export const getUsersForSidebar = async (req,res)=>{
    try {
        const userId = req.user._id;
        const filtereduser = await User.find({_id: {$ne: userId}}).select("-password");
        // get number of messages not seen
        const unseenMessages = {}
        const promises = filtereduser.map(async (user)=>{
       const messages = await Message.find({senderId: user._id,receiverId: userId,seen: false});
           if(messages.length > 0)
           {
                 unseenMessages[user._id] = messages.length;
           }
        
        })
        await Promise.all(promises);
        res.json({success: true,users: filtereduser,unseenMessages});
    } catch (error) {
        console.log(error.message);
        res.json({success: false,message: error.message});
    }
}
// get all messages for selected user 
export const getmessages = async(req,res) =>{
    try {
        const {id: selecteduserid} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: selecteduserid},
                {senderId: selecteduserid, receiverId: myId},
            ]
        })
        await Message.updateMany({
            senderId: selecteduserid,
            receiverId: myId
        },{seen: true});
        res.json({success: true,messages});
    } catch (error) {
        console.log(error.message);
        res.json({success: false,message:error.message});
    }
}
// api to mark message as seen using message id
export const markmessageasseen = async(req,res) =>{
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{seen: true});
        res.json({success: true});
    } catch (error) {
        console.log(error.message);
        res.json({success: false,message:error.message});
    }
}