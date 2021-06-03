import { PgErrorEnum } from "@techmmunity/database-error-handler";

import { TemplateService } from "v1/api/template/template.service";

import { ApplicationEnum } from "core/enums/applications";
import { LanguageEnum } from "core/enums/language";
import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

import { templateMock } from "v1/tests/mocks/template";
import { templateContentMock } from "v1/tests/mocks/template-content";
import { templateFieldMock } from "v1/tests/mocks/template-field";

describe("TemplateService > create", () => {
	let service: TemplateService;

	const code = "example.template";
	const description = "foo bar foo bar";
	const validContent =
		"<!DOCTYPE html><html><head><title>Title</title></head><body><h1>Hello Word</h1></body></html>";

	beforeAll(async () => {
		service = await templateMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create template with valid params", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "example",
			type: TemplateFieldTypeEnum.STRING,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content: validContent,
			subject: "foo",
		});

		templateMock.repository.save.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.create({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code,
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description,
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});
	});

	it("should throw error if template with the same code and application already exists", async () => {
		templateMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (application, code)=(${ApplicationEnum.UNIQUE_LOGIN_SYSTEM}, example.template) already exists.`,
			table: "templates",
		});

		let result;

		try {
			result = await service.create({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code,
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description,
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (err) {
			result = err;
		}

		expect(templateMock.repository.save).toBeCalledTimes(1);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: [
				`Template with code "example.template" already exists for application "${ApplicationEnum.UNIQUE_LOGIN_SYSTEM}"`,
			],
		});
	});
});
