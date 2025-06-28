import mongoose from "mongoose";

const validateUsername = (username) => {
    return username && username.length >= 5 && username.length <= 20 && !username.includes(" ") && !(/^[0-9]/.test(username)) && !(/^[^0-9a-zA-Z]/.test(username));
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        trim: true,
        minLength: 5,
        unique: true,
        validate: { validator: validateUsername, message: "Username Must not contain spaces, must not start with non-alphabetic characters and must be atleast 5 characters." }
    },
    password: { type: String, required: true, minLength: [8, 'Password must be atleast 8 characters'] },
    tasks: {
        type: Array
    },
    totalTasks: {
        type: Number,
        default: 0
    }
});


const User = mongoose.model("users", userSchema);

export default User;

