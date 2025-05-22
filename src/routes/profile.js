const express = require("express");
const { userAuth } = require("../middleWare/auth");
const {validateEditProfileData, validatePasswordData} = require("../util/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, (req, res) => {
    try {
      const user = req.user;
  
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  });

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if (!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request!!!")
        }
        
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])

        await loggedInUser.save();

        res.json({message: ` ${loggedInUser.firstName}, your profile is updated successfully`,
            data: loggedInUser,
        })

    }catch(error){
        res.status(400).send("ERROR: "+ error.message)
    }
})

profileRouter.patch("/profile/password", userAuth, async (req,res) => {
    try { 
       const {currentPassword, newPassword} = req.body;
        if(!currentPassword || !newPassword) {
            throw new Error("Both current and new pssword are required.");
        }

        const loggedInUser = req.user;

        const isPasswordMatched = await bcrypt.compare(currentPassword, loggedInUser.password);
        if(!isPasswordMatched) {
            throw new Error ("Current password is Incorrect.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        loggedInUser.password = hashedPassword;
        await loggedInUser.save();
        res.json({
            message: "Your password has been updated successfully."
        })

    } catch (error) {
        res.status(400).send("ERROR: "+ error.message)
    }
})


module.exports = profileRouter;
