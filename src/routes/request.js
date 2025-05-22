const express = require("express");
const { userAuth } = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status

        const allowedStatus = ["ignored", "interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type " + status})
        }

        const toUser= await User.findById(toUserId);

        if(!toUser){
            return res.status(404).json({message: "user not found!!!"})
        }

        const existingConectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })

        if(existingConectionRequest){
           return res.status(404).json({mesage: "connection request already Existed"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName+ " sent connection to " + toUser.firstName + " successfully" ,
            data
        })
    } catch (error) {
        res.status(400).send("ERROR: "+ error.message)
    }
});
module.exports = requestRouter;
