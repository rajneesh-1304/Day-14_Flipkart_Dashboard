import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1769113107044 implements MigrationInterface {
    name = 'CreateProducts1769113107044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "subcategory" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "subcategory"`);
    }

}
