import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // basic validation
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"user doesnot exist",
                success:false
            })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                message:"Incorrect password",
                success:false
            });   
    }   const tokenData = {
        id:user._id,
        email:user.email
    
    }
        // 
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"1d"});
        return res.status(201).cookie("token", token, {httpOnly:true}).send({
            message:`Login successful,welcome ${user.name}`,
            user,
            success:true,
            token:token
        });
}    catch (error) {
        console.log(error);
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token").send({
            message:"Logout successful",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const bookmarkOrUnbookmark = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        
        // Check if the tweet ID is valid
        if (!tweetId) {
            return res.status(400).json({ message: "Invalid tweet ID" });
        }

        // Find the tweet by ID
        const user = await User.findById(tweetId);

        // Check if the tweet exists
        if (!user) {
            return res.status(404).json({ message: "Tweet not found" });
        }

        // Check if the loggedInUserId is present in the tweet's 'bookmark' array
        if (user.bookmarks.includes(tweetId)) {
            // If the user has already bookmarked the tweet, unbookmark it
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({ message: "User unbookmarked your tweet." });
        } else {
            // If the user has not bookmarked the tweet, bookmark it
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({ message: "User bookmarked your tweet." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error);
    }
};

export const getOtherUsers = async (req,res) =>{ 
    try {
         const {id} = req.params;
         const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
         if(!otherUsers){
            return res.status(401).json({
                message:"Currently do not have any users."
            })
         };
         return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
    }
}

export const follow = async(req,res)=>{
    try {
        const loggedInUserId = req.body.id; 
        const userId = req.params.id; 
        const loggedInUser = await User.findById(loggedInUserId);//patel
        const user = await User.findById(userId);//keshav
        if(!user.followers.includes(loggedInUserId)){
            await user.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userId}});
        }else{
            return res.status(400).json({
                message:`User already followed to ${user.name}`
            })
        };
        return res.status(200).json({
            message:`${loggedInUser.name} just follow to ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const unfollow = async (req,res) => {
    try {
        const loggedInUserId = req.body.id; 
        const userId = req.params.id; 
        const loggedInUser = await User.findById(loggedInUserId);//patel
        const user = await User.findById(userId);//keshav
        if(loggedInUser.following.includes(userId)){
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userId}});
        }else{
            return res.status(400).json({
                message:`User has not followed yet`
            })
        };
        return res.status(200).json({
            message:`${loggedInUser.name} unfollow to ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

