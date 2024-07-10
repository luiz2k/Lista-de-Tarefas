import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	task: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
});

export const Task = mongoose.model("Task", TaskSchema);
