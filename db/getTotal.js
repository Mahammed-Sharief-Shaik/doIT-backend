import User from "../models/User.js"


const getTotal = async (username) => {
    const {totalTasks} = await User.findOne({username},
        {
            _id:0,
            totalTasks : 1
        }
    );

    return totalTasks;
}

export default getTotal;