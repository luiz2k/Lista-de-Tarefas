import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

const revokedTokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	revokedAt: {
		type: Date,
		required: true,
	},
});

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);
