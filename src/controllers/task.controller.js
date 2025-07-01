import Task from "../models/task.model.js"


export const getTasks = async(req, res) => {
    const tasks = await Task.find({
        user: req.user.id 
    }).populate("user")// Assuming you have a user model and want to populate the user field with name and email
    res.json(tasks)
}

export const createTask = async(req, res) => {
    const { title, description, date} = req.body 

    console.log(req.user)

    const newTask = new Task({ 
        title, 
        description, 
        date,
        user: req.user.id// Assuming you have userId in the request object from auth middleware
    })
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
}

export const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "Task not found"})
    res.status(204).json({message: "Task deleted successfully"})
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, 
    {
        new: true,
    })
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}

