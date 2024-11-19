import mongoose, { Document, Schema } from "mongoose";

mongoose.connect("mongodb://localhost:27017/WhatToDoDB");

export enum TaskStatusEnum {
  NEW = "new",
  INPROGRESS = "inprogress",
  DONE = "done",
}

export interface ITask extends Document {
    name: string,
    content: string,
    startDate: Date,
    endDate: Date,
    status: TaskStatusEnum
}

const taskSchema: Schema = new Schema(
    {
      name: { 
        type: String, 
        required: true 
      },
      content: {
         type: String, 
         required: true 
      }, 
      startDate: { 
        type: Date, 
        required: false
      }, 
      endDate: { 
        type: Date, 
        required: false 
      }, 
      status: {
        type: String,
        enum: Object.values(TaskStatusEnum),
        default: TaskStatusEnum.NEW,
      },
    },
    {
      timestamps: true, 
      collection: "Tasks", 
    }
  );

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;

