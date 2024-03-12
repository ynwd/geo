import { MigrationInterface, QueryRunner } from "typeorm";

export class Geo1710196370048 implements MigrationInterface {
    name = 'Geo1710196370048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "geo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "data" jsonb NOT NULL, CONSTRAINT "PK_56e32047948967e75e3d980c9c1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "geo"`);
    }

}
