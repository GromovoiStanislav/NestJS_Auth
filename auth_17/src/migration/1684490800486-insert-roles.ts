import { MigrationInterface, QueryRunner } from "typeorm"


export class insertRoles1684490800486 implements MigrationInterface {
    name = 'insertRoles1684490800486'


    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        insert into roles (name) values ('user');
        insert into roles (name) values ('moderator');
        insert into roles (name) values ('admin');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}