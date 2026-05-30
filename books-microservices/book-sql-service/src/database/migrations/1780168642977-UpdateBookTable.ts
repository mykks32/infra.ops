import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateBookTable1780168642977 implements MigrationInterface {
  name = 'UpdateBookTable1780168642977'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "book" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "createdAt"`)
  }
}
