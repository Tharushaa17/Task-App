import asyncHandler from "express-async-handler";
import Task from "../models/task.model.js";

export const getAllTasks = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  try {
    const tasks = await Task.find({ user: id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

export const createNewTask = asyncHandler(async (req, res) => {

const { user, title, text, dateTime, compleated } = req.body;

if (!user || !title || !text || !dateTime) {

  return res.status(400).json({ message: "All fields are required" });
}

const duplicate = await Task.findOne({ dateTime }).lean().exec();

if (duplicate) {
  return res.status(409).json({ message: "Duplicate Task title" });
}

const note = await Task.create({ user, title, text, dateTime, compleated });

  if (note) {
    return res.status(201).json({ message: "New Task created" });
  } else {
    return res.status(400).json({ message: "Invalid Task data received" });
  }
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Task ID Required" });
  }
  
  const task = await Task.findById(id).exec();
  
  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }
  
  console.log(req.body.formdata);
  const { user, title, text, dateTime, compleated } = req.body.formdata;
  
  if ( !user || !title || !text || !dateTime || !compleated) {
    res.status(400).json({ message: "All feilds are required" });
  }
  
  const dublicateTask = await Task.findOne({ title, _id: { $ne: id } })
  .lean()
  .exec();
  
  if (dublicateTask) {
    return res.status(409).json({ message: "Duplicate Task Name" });
  }
  
  task.user = user;
  task.title = title;
  task.text = text;
  task.dateTime = dateTime;
  task.compleated = compleated;
  
  try {
    
    const updatedTask = await task.save();
    console.log(id);
  
    res.json({ message: `${updatedTask.title} updated` });
  } catch (error) {
    next(error);
  }
});

export const editTask = asyncHandler(async(req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Task ID Required" });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Task ID Required" });
  }

  const task = await Task.findById(id).exec();

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }

  try {   
    await task.deleteOne();
  
    res.json({ success: true, message: `${task.title} Task has been deleted! ` });
  } catch (error) {
    res.json(error);
  }
});

