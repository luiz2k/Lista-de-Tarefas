import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../../types/task";
import { User } from "./userEntity";

@Entity({ name: "tasks" })
export class Task {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar" })
	task: string;

	@Column({ type: "varchar", enum: TaskStatus, default: "pending" })
	status: TaskStatus;

	@Column({ name: "created_at", type: "timestamp", default: new Date() })
	createdAt: Date;

	@ManyToOne(
		() => User,
		(user) => user.tasks,
	)
	user: User;
}
