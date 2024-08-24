import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../validations/envValidation.js";
import { RefreshToken, RevokedToken } from "./entities/jwtEntity.js";
import { Task } from "./entities/taskEntity.js";
import { User } from "./entities/userEntity.js";
import { Migration1724096667962 } from "./migrations/1724096667962-migration.js";

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
	entities: [User, Task, RefreshToken, RevokedToken],
	migrations: [Migration1724096667962],
});
