import mongoose, { Document, Schema } from "mongoose";

mongoose.connect("mongodb://localhost:27017/WhatToDoDB");

export interface ITask extends Document {
    name: string,
    content: string,
    startDate: Date,
    endDate: Date,
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
    },
    {
      timestamps: true, 
      collection: "Tasks", 
    }
  );

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;

