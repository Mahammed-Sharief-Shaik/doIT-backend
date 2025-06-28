import mongoose from "mongoose"
import Task from "../models/Task.js"
import User from "../models/User.js";


const markTask = async (id, username) => {
    try {

        await Task.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                $set: {
                    isCompleted: true
                }
            }
        );

        const { tasks } = await User.findOne({ username }, { _id: 0, tasks: 1 });

        const updatedTasks = tasks.filter(tid => tid !== id);

        await User.updateOne({ username }, { $set: { tasks: updatedTasks } });


    } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Error:', e);
        }
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export default markTask;