import User from "../models/User.js";


const insertTaskToUser = async (username, id) => {
    const { tasks } = await User.findOne({ username }, { _id: 0, tasks: 1 });
    const newTasks = [...tasks, id];

    await User.updateOne({ username },
        {
            $set: { tasks: newTasks },
            $inc: {totalTasks:1}
        }
    );
}

export default insertTaskToUser;