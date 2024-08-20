import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724096667962 implements MigrationInterface {
    name = 'Migration1724096667962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refreshTokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "created_at" date NOT NULL, "expires_at" date NOT NULL, "userId" uuid, CONSTRAINT "PK_c4a0078b846c2c4508473680625" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "revokedTokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "revoked_at" date NOT NULL, "userId" uuid, CONSTRAINT "PK_0d1fb0a01f9bb1c2e2439cdd6fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "created_at" date NOT NULL DEFAULT '"2024-08-19T19:44:30.159Z"', "userId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" ADD CONSTRAINT "FK_265bec4e500714d5269580a0219" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "revokedTokens" ADD CONSTRAINT "FK_f5c2c66c6277afea342cfa5f02f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "revokedTokens" DROP CONSTRAINT "FK_f5c2c66c6277afea342cfa5f02f"`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" DROP CONSTRAINT "FK_265bec4e500714d5269580a0219"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "revokedTokens"`);
        await queryRunner.query(`DROP TABLE "refreshTokens"`);
    }

}
