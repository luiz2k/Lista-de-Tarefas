import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity.js";

@Entity({ name: "refreshTokens" })
export class RefreshToken {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar" })
	token: string;

	@Column({ name: "created_at", type: "date" })
	createdAt: Date;

	@Column({ name: "expires_at", type: "date" })
	expiresAt: Date;

	@ManyToOne(
		() => User,
		(user) => user.refreshTokens,
	)
	user: User;
}

@Entity({ name: "revokedTokens" })
export class RevokedToken {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar" })
	token: string;

	@Column({ name: "revoked_at", type: "date" })
	revokedAt: Date;

	@ManyToOne(
		() => User,
		(user) => user.revokedTokens,
	)
	user: User;
}
