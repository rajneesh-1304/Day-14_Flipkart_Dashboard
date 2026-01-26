import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1769249908365 implements MigrationInterface {
    name = 'InitMigration1769249908365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "sellerId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sellerId"`);
    }

}
