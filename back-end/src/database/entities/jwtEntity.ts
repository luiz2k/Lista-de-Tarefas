import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";

@Entity({ name: "refreshTokens" })
export class RefreshToken {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar" })
	token: string;

	@Column({ name: "created_at", type: "timestamp" })
	createdAt: Date;

	@Column({ name: "expires_at", type: "timestamp" })
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

	@Column({ name: "revoked_at", type: "timestamp" })
	revokedAt: Date;

	@ManyToOne(
		() => User,
		(user) => user.revokedTokens,
	)
	user: User;
}
