import express from "express";
import auth from '../middlewares/authMiddleware.js';
import getTasks from "../db/getTasks.js";
import addTask from "../db/addTask.js";
import markTask from "../db/markTask.js";
import getTotal from "../db/getTotal.js";
import deleteTask from "../db/deleteTask.js";

const privateRouter = express.Router();

privateRouter.get(
    '/dashboard',
    auth,
    (req, res) => {
        const userDash = `Hello, welcome ${JSON.stringify(req.user)}`;
        res.send(userDash);
    }

)

privateRouter.get(
    '/getTasks/:username',
    auth,
   async (req, res) => {
 
        const username = req.params.username;
        const tasks = await getTasks(username);
        res.status(200).json(tasks);
    }
);


privateRouter.post(
    '/:username/addTask',
    auth,
     async (req, res ) => {
        const newTaskId = await addTask(req.body, req.params.username);    
        res.json({
            message : 'Task added Successfully',
            id : newTaskId
        })
    }
)

privateRouter.put(
    '/:username/done',
    auth,
    async (req, res ) => {
        await markTask(req.body.id, req.params.username);
        
    }
)

privateRouter.get(
    '/:username/total',
    auth,
    async (req, res) => {
        const total =await  getTotal(req.params.username);
        res.json({total});
    }
)

privateRouter.delete(
    '/:username/delete-task',
    auth,
    async (req, res ) => {
        await deleteTask(req.params.username, req.body.id);
    }
)

export default privateRouter;