import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName : {
        type : String,
        required : true
    },
    desc : {
        type : String
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
});

const Task = mongoose.model('tasks', taskSchema);

export default Task;