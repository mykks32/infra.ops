import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddBookTable1780165445384 implements MigrationInterface {
  name = 'AddBookTable1780165445384'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "author" character varying(255) NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`)
  }
}
