import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemplateTables1619989394868 implements MigrationInterface {
	public name = "AddTemplateTables1619989394868";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "template_fields" ("template_id" character varying NOT NULL, "field" character varying(50) NOT NULL, "type" character varying NOT NULL, "description" character varying(1000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9f89e5df1d47742a2cb6d291545" PRIMARY KEY ("template_id", "field"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "templates" ("id" character varying(36) NOT NULL, "application" character varying NOT NULL, "code" character varying(25) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_695dcf734f5fbdf41c48427c3d0" UNIQUE ("application", "code"), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_be38737bf339baf63b1daeffb5" ON "templates" ("code") `,
		);
		await queryRunner.query(
			`CREATE TABLE "template_contents" ("template_id" character varying NOT NULL, "language" character varying NOT NULL, "content" character varying(25000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_17f35a0c98f9a8633278ecc174d" PRIMARY KEY ("template_id", "language"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "template_fields" ADD CONSTRAINT "FK_609a78fd29a08b0c4f00ab6c815" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "template_contents" ADD CONSTRAINT "FK_d8c78b08f4194eebbc4310df3fb" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "template_contents" DROP CONSTRAINT "FK_d8c78b08f4194eebbc4310df3fb"`,
		);
		await queryRunner.query(
			`ALTER TABLE "template_fields" DROP CONSTRAINT "FK_609a78fd29a08b0c4f00ab6c815"`,
		);
		await queryRunner.query(`DROP TABLE "template_contents"`);
		await queryRunner.query(`DROP INDEX "IDX_be38737bf339baf63b1daeffb5"`);
		await queryRunner.query(`DROP TABLE "templates"`);
		await queryRunner.query(`DROP TABLE "template_fields"`);
	}
}
