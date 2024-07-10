import mongoose from "mongoose";
import { env } from "../validations/envValidation";

export const databaseConnect = async () => {
	console.log("Conectando ao MongoDB...");

	try {
		await mongoose.connect(env.MONGODB_URI);

		console.log("Conectado ao MongoDB!");
	} catch (error) {
		console.log(`Erro ao se conectar com MongoDB: ${error}`);
	}
};
