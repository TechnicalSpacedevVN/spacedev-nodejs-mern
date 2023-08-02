import { Schema } from "mongoose";

const CourseSchema = new Schema({
  content: [
    {
      title: String,
      content: String,
    },
  ],
  required: [String],
  hinhThucHoc: [String],
  schedule: String,
  startDate: Date,
  endDate: Date,
  time: Date,
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mentors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  }
});
