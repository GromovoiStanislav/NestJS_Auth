import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684490800485 implements MigrationInterface {
    name = 'Init1684490800485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('user', 'admin', 'moderator')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" "public"."roles_name_enum" NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_to_roles" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_3c5401b4b6598b480175395e360" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e93c6d34c8fe01dded0844b0ad" ON "users_to_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1ea0fe52eda3311425a3d253f" ON "users_to_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users_to_roles" ADD CONSTRAINT "FK_e93c6d34c8fe01dded0844b0ada" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_to_roles" ADD CONSTRAINT "FK_e1ea0fe52eda3311425a3d253f6" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_to_roles" DROP CONSTRAINT "FK_e1ea0fe52eda3311425a3d253f6"`);
        await queryRunner.query(`ALTER TABLE "users_to_roles" DROP CONSTRAINT "FK_e93c6d34c8fe01dded0844b0ada"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1ea0fe52eda3311425a3d253f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e93c6d34c8fe01dded0844b0ad"`);
        await queryRunner.query(`DROP TABLE "users_to_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
    }

}
