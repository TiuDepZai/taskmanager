const Task = require('../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userID: req.user.id});
        res.json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({message: "Server error"});
    }
};

const addTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    try{
        const task = await Task.create({userID: req.user.id, title, description, deadline});
        res.status(201).json(task);

    }
    catch(error) {
        console.error("Error adding task:", error);
        res.status(500).json({message: "Server error"});
    }
};

const updateTask = async (req, res) => {
    const { title, description, completed, deadline } = req.body;
    try{
        const task = await Task.FindById(req.params.id);
        if (!task) return res.status(404).json({message: "Task not found"});

        task.title = title || task.title;
        task.description = description || task.description; 
        task.completed = completed ?? task.completed;
        task.deadline = deadline || task.deadline;
        
        const updatedTask = await task.save();
        res.json(updatedTask);
    }
    catch(error) {
        console.error("Error updating task:", error);
        res.status(500).json({message: "Server error"});
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({message: "Task not found"});
        await task.remove();
        res.json({message: "Task deleted successfully"});
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({message: "Server error"});
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };