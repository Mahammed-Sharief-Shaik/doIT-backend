import bcrypt from "bcryptjs";
import User from "../models/User.js";


const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(409).json({
            message: "Incomplete Request"
        });
        return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
        username, password: hashed
    });

    try {
        await newUser.save();
        res.json({
            message: "User Registered successfully",
            username
        });
    } catch (error) {

        if (error.code == 11000) {
            res.status(409).json({
                message: "Username Exists : Duplicate User",
                code: error.code
            })
        }

        else if (error.message = 'ValidationError') {
            console.error(error.message);

            res.status(409).json({
                message : error.message,
                msg : error.errmsg
            })
        }

        else {

            res.status(409).json({ "error": `Unknown Error  ${error}` });
        }
    }

}

export default registerUser;