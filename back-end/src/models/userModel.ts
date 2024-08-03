import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre("save", async function (next) {
	const HASH_SALT: number = 10;

	const hash = await bcrypt.hash(this.password, HASH_SALT);

	this.password = hash;

	next();
});

export const User = mongoose.model("User", UserSchema);
