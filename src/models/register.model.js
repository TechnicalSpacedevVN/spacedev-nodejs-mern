import { Schema } from "mongoose";

const RegisterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

RegisterSchema.index({ userId: 1, courseId: 1 }, { unique: true });
