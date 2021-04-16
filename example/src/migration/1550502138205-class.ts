import { MigrationInterface, QueryRunner } from "typeorm";
import { ClassName, ClassNameEvolve } from "../enums/className";

export class Migration1550502138205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        `SELECT '${ClassName.BEGGINNER}', 0, 0, 0, 0, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.BEGGINNER}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        `SELECT '${ClassName.WARRIOR}', 0, 0, 0, 0, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.WARRIOR}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassName.MAGE}', 0, 0, 3, 0, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.MAGE}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        ` SELECT '${ClassName.THIEF}', 0, 0, 0, 1, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.THIEF}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassName.ARCHER}', 0, 0, 0, 0, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.ARCHER}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        `SELECT '${ClassNameEvolve.KNIGHT}', 0, 0, 0, 1, 10, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.KNIGHT}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.PALADIN}', 0, 5, 0, 1, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.PALADIN}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        ` SELECT '${ClassNameEvolve.NECRO}', 0, 0, 0, 0, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.NECRO}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.LADIN}', 0, 0, 0, 1, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.LADIN}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.NINJA}', 0, 5, 0, 1, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.NINJA}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        ` SELECT '${ClassNameEvolve.HUNTER}', 1, 10, 0, 1, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.HUNTER}')`,
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.TRICKSTER}', 1, 5, 0, 1, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.TRICKSTER}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
