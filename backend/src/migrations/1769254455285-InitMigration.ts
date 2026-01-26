import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1769254455285 implements MigrationInterface {
    name = 'InitMigration1769254455285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "images" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
    }

}
