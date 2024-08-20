import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";

@Entity({ name: "tasks" })
export class Task {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar" })
	task: string;

	@Column({ type: "boolean", default: false })
	completed: boolean;

	@Column({ name: "created_at", type: "date", default: new Date() })
	createdAt: Date;

	@ManyToOne(
		() => User,
		(user) => user.tasks,
	)
	user: User;
}
