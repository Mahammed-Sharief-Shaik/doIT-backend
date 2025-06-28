import mongoose from "mongoose"
import Task from "../models/Task.js"
import User from "../models/User.js";


const deleteTask = async (username, id) => {
    await Task.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    const { tasks } = await User.findOne({ username }, { _id: 0, tasks: 1, totalTasks: 1 });
    const updatedTasks = tasks.filter(tid => tid.toString() !== id.toString());
    await User.updateOne({ username },
        {
            $set: { tasks: updatedTasks },
            $inc: { totalTasks: -1 }
        });

}

export default deleteTask;