import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config({
    path: '../config/.env'
})

// next is someone who checks if the user is authenticated or not
// if the user is authenticated then it will call the next function
// for this in route we have to pass this function as a middleware
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}
export default isAuthenticated;