import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1769260579719 implements MigrationInterface {
    name = 'InitMigration1769260579719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "landmark" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "pincode" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
