import { hashSync } from "bcrypt";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { RefreshToken, RevokedToken } from "./jwtEntity";
import { Task } from "./taskEntity";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar" })
	username: string;

	@Column({ type: "varchar", unique: true })
	email: string;

	@Column({ type: "varchar" })
	password: string;

	@OneToMany(
		() => Task,
		(task) => task.user,
	)
	tasks: Task[];

	@OneToMany(
		() => RefreshToken,
		(token) => token.user,
	)
	refreshTokens: RefreshToken[];

	@OneToMany(
		() => RevokedToken,
		(token) => token.user,
	)
	revokedTokens: RevokedToken[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const HASH_SALT: number = 10;

		const hash = hashSync(this.password, HASH_SALT);

		this.password = hash;
	}
}
