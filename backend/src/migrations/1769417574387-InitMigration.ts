import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1769417574387 implements MigrationInterface {
    name = 'InitMigration1769417574387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "productName" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "orderId" integer, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_tracking" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'INPROCESS', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer, CONSTRAINT "PK_9a32ecbe7d925bd403cae3e76e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "totalAmount" numeric(10,2) NOT NULL, "status" character varying NOT NULL DEFAULT 'INPROCESS', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_tracking" ADD CONSTRAINT "FK_85acfbdf5c1c33daca863f8118b" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_tracking" DROP CONSTRAINT "FK_85acfbdf5c1c33daca863f8118b"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_tracking"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
    }

}
