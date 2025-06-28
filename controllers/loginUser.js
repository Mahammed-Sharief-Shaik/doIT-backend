import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || 'Hello@123';

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(409).json({
            message: "Incomplete Request"
        });
        return;
    }

    else {

        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(401).json({
                message: 'User Not Found (Please Register)'

            });
            return;
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            res.status(401).json({
                message: 'Incorrect password'
            }); 
            return;
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1hr' });
        res.json({ token, user:username, totalTasks : user.totalTasks });
    }
};


export default loginUser;