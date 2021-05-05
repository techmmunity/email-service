import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubjectFieldToTemplateContentTable1620212794844
	implements MigrationInterface {
	public name = "AddSubjectFieldToTemplateContentTable1620212794844";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "template_contents" ADD "subject" character varying(100) NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "template_contents" DROP COLUMN "subject"`,
		);
	}
}
