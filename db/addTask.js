import Task from "../models/Task.js";
import insertTaskToUser from "./insertTaskToUser.js";


const addTask = async(task, name) => {
    const add = await Task.insertOne(task);
    await insertTaskToUser(name, add._id.toString());
    return add._id;

}

export default addTask;