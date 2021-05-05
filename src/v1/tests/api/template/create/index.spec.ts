import { TemplateService } from "v1/api/template/template.service";

import { ApplicationEnum } from "core/enums/applications";
import { DbErrorEnum } from "core/enums/db-error";
import { LanguageEnum } from "core/enums/language";
import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

import { TemplateMock } from "v1/tests/mocks/template";
import { TemplateContentMock } from "v1/tests/mocks/template-content";
import { TemplateFieldMock } from "v1/tests/mocks/template-field";

describe("TemplateService > create", () => {
	let service: TemplateService;

	const validContent =
		"<!DOCTYPE html><html><head><title>Title</title></head><body><h1>Hello Word</h1></body></html>";

	beforeAll(async () => {
		service = await TemplateMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create template with valid params", async () => {
		const templateDoc = TemplateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: "example.template",
		});
		const templateFieldDoc = TemplateFieldMock.doc({
			templateId: templateDoc.id,
			field: "example",
			type: TemplateFieldTypeEnum.STRING,
			descripion: "foo bar foo bar",
		});
		const templateContentDoc = TemplateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content: validContent,
			subject: "foo",
		});

		TemplateMock.repository.save.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.create({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
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

		expect(TemplateMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});
	});

	it("should throw error if template with the same code and application already exists", async () => {
		TemplateMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.UniqueViolation,
			detail: `Key (application, code)=(${ApplicationEnum.UNIQUE_LOGIN_SYSTEM}, example.template) already exists.`,
			table: "templates",
		});

		let result;

		try {
			result = await service.create({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
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

		expect(TemplateMock.repository.save).toBeCalledTimes(1);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: [
				`Template with code "example.template" already exists for application "${ApplicationEnum.UNIQUE_LOGIN_SYSTEM}"`,
			],
		});
	});
});
