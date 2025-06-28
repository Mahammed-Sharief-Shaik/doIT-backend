import Task from '../models/Task.js';
import User from '../models/User.js'
import mongoose from 'mongoose';

const getTasks = async (username) => {

    const { tasks } = await User.findOne({ username: username },
        { tasks: 1, _id: 0 });

    const listOfTasks = await Task.find(
        { _id: { $in: tasks } }
    );
    const modifiedList = listOfTasks.map(({ taskName, desc, _id, isCompleted }) => {
        const strId = _id.toString();
        return (
            {
                taskName,
                desc,
                id: strId, isCompleted
            }
        )
    })
    return modifiedList;
}

export default getTasks;