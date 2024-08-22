import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../validations/envValidation";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: env.DB_HOST,
	port: env.DB_PORT,
	username: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE,
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
	entities: ["./src/database/entities/*{.ts,.js}"],
	migrations: ["./src/database/migrations/*{.ts,.js}"],
});
