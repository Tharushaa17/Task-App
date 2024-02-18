import AutoIncrement from "mongoose-sequence";
import mongoose from "mongoose";

const AutoIncrementPlugin = AutoIncrement(mongoose);

const taskSchema = new mongoose.Schema(
  {
    taskNumber: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      default: Date.now,
    },
    compleated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(AutoIncrementPlugin, {
  inc_field: "taskNumber",
  id: "taskNums",
  start_seq: 500,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
